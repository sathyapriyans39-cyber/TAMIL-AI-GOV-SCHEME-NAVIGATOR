/**
 * NearbyCentres Component
 * Interactive e-Seva & CSC Service Centres Locator with Real-Time Leaflet Map & GPS proximity
 */

import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Building, 
  Compass, 
  Building2, 
  Layers, 
  Map as MapIcon,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const API_BASE = 'http://localhost:5000/api';

const DISTRICT_COORDINATES = {
  "Chennai": [13.0827, 80.2707],
  "Coimbatore": [11.0168, 76.9558],
  "Madurai": [9.9252, 78.1198],
  "Tiruchirappalli": [10.7905, 78.7047],
  "Salem": [11.6643, 78.1460],
  "Tirunelveli": [8.7139, 77.7567],
  "Thanjavur": [10.7870, 79.1378],
  "Vellore": [12.9165, 79.1325],
  "Erode": [11.3410, 77.7172],
  "Dindigul": [10.3673, 77.9803],
  "Kancheepuram": [12.8342, 79.7036],
  "Cuddalore": [11.7480, 79.7714],
  "Tiruppur": [11.1085, 77.3411],
  "Nilgiris": [11.4102, 76.6950],
  "Kallakurichi": [11.7384, 78.9639],
  "Chengalpattu": [12.6819, 79.9836]
};

export function NearbyCentres() {
  const { lang, t } = useLanguage();

  const [centres, setCentres] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [selectedCentre, setSelectedCentre] = useState(null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Fetch districts list
  useEffect(() => {
    async function fetchDistricts() {
      try {
        const res = await fetch(`${API_BASE}/centres/districts`);
        const data = await res.json();
        if (data.success) {
          setDistricts(data.districts || []);
        }
      } catch (err) {
        console.warn('Failed to load districts:', err);
      }
    }
    fetchDistricts();
  }, []);

  // Fetch centres based on district & search
  useEffect(() => {
    async function fetchCentres() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedDistrict !== 'ALL') params.append('district', selectedDistrict);
        if (searchQuery.trim()) params.append('search', searchQuery.trim());

        const res = await fetch(`${API_BASE}/centres?${params.toString()}`);
        const data = await res.json();
        if (data.success) {
          setCentres(data.centres || []);
          if (data.centres?.length > 0) {
            setSelectedCentre(data.centres[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching centres:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCentres();
  }, [selectedDistrict, searchQuery]);

  // Initialize Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [11.1271, 78.6569], // Tamil Nadu center
        zoom: 7,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup map on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Map Markers whenever centres or selectedCentre changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // User Location Blue Pulsing Pin
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div style="
            position: relative;
            width: 24px;
            height: 24px;
            background: #2563eb;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(37,99,235,0.8);
          ">
            <span style="
              position: absolute;
              inset: -6px;
              border-radius: 50%;
              background: rgba(37,99,235,0.35);
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .bindPopup(`<b>${lang === 'ta' ? 'உங்கள் இருப்பிடம்' : 'Your GPS Location'}</b>`)
        .addTo(markersLayer);
    }

    // Add Markers for all current Centres
    centres.forEach((centre) => {
      if (!centre.lat || !centre.lng) return;

      const isSelected = selectedCentre?.id === centre.id;
      const markerIcon = L.divIcon({
        className: 'custom-centre-marker',
        html: `
          <div style="
            background: ${isSelected ? '#059669' : '#0f172a'};
            color: white;
            width: ${isSelected ? '38px' : '32px'};
            height: ${isSelected ? '38px' : '32px'};
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${isSelected ? '18px' : '15px'};
            box-shadow: 0 8px 20px rgba(0,0,0,0.35);
            border: 2px solid ${isSelected ? '#34d399' : '#ffffff'};
            transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
          ">
            🏛️
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      });

      const directionsUrl = centre.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${centre.lat},${centre.lng}`;

      const popupContent = `
        <div style="font-family: inherit; max-width: 240px; padding: 4px;">
          <div style="font-size: 10px; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 2px;">
            ${centre.type} • ${centre.district}
          </div>
          <div style="font-size: 13px; font-weight: bold; color: #0f172a; line-height: 1.25; margin-bottom: 4px;">
            ${lang === 'ta' ? centre.tamilName || centre.name : centre.name}
          </div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
            ${lang === 'ta' ? centre.tamilAddress || centre.address : centre.address}
          </div>
          <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="
            display: inline-block;
            background: #059669;
            color: white;
            font-size: 11px;
            font-weight: bold;
            padding: 6px 12px;
            border-radius: 8px;
            text-decoration: none;
          ">
            🗺️ ${lang === 'ta' ? 'வழித்தடம் (Google Maps)' : 'Get Directions'}
          </a>
        </div>
      `;

      const marker = L.marker([centre.lat, centre.lng], { icon: markerIcon })
        .bindPopup(popupContent)
        .addTo(markersLayer);

      marker.on('click', () => {
        setSelectedCentre(centre);
      });

      if (isSelected) {
        marker.openPopup();
      }
    });

    // Handle Pan and Zoom
    if (selectedCentre && selectedCentre.lat && selectedCentre.lng) {
      map.flyTo([selectedCentre.lat, selectedCentre.lng], 13, { duration: 1 });
    } else if (selectedDistrict !== 'ALL' && DISTRICT_COORDINATES[selectedDistrict]) {
      map.flyTo(DISTRICT_COORDINATES[selectedDistrict], 11, { duration: 1 });
    } else if (centres.length > 0 && !selectedCentre) {
      map.flyTo([11.1271, 78.6569], 7, { duration: 1 });
    }
  }, [centres, selectedCentre, selectedDistrict, userLocation, lang]);

  // GPS Geolocation Handler
  const handleUseGps = () => {
    if (!navigator.geolocation) {
      alert(lang === 'ta' ? 'உங்கள் உலாவியில் இருப்பிட வசதி இல்லை' : 'Geolocation is not supported by your browser');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        try {
          const res = await fetch(`${API_BASE}/centres/nearby?lat=${latitude}&lng=${longitude}&limit=10`);
          const data = await res.json();
          if (data.success && data.nearestCentres) {
            setCentres(data.nearestCentres);
            if (data.nearestCentres.length > 0) {
              setSelectedCentre(data.nearestCentres[0]);
            }
          }
        } catch (err) {
          console.error('GPS nearby fetch error:', err);
        } finally {
          setGpsLoading(false);
        }
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setGpsLoading(false);
        alert(lang === 'ta' ? 'இருப்பிடத்தை அணுக அனுமதி வழங்கவும்' : 'Please allow location access in your browser');
      }
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            <Building2 className="w-4 h-4" />
            <span>{lang === 'ta' ? 'இ-சேவை மற்றும் விண்ணப்ப மையங்கள்' : 'Application & Service Centres'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'ta' ? 'அருகிலுள்ள இ-சேவை மையங்களை கண்டறியுங்கள்' : 'Locate Nearby e-Seva & CSC Centres'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {lang === 'ta'
              ? 'தமிழ்நாட்டின் 38 மாவட்டங்களிலும் உள்ள அரசு இ-சேவை மையங்கள் மற்றும் வட்டாட்சியர் அலுவலகங்கள்'
              : 'Find authorized TNeGA e-Seva centres, Taluk offices, and CSC points across all 38 districts of Tamil Nadu with live map navigation'}
          </p>
        </div>

        {/* GPS Button */}
        <button
          onClick={handleUseGps}
          disabled={gpsLoading}
          className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all self-start md:self-auto shrink-0"
        >
          <Navigation className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
          <span>{gpsLoading ? (lang === 'ta' ? 'கண்டறிகிறது...' : 'Locating...') : t('centres.useMyGps')}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-3">
        
        {/* District Selector */}
        <div className="w-full sm:w-64">
          <label className="block text-[11px] font-bold text-slate-500 mb-1">
            {t('centres.selectDistrict')}
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 py-2.5 px-3 rounded-xl focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">{t('centres.allDistricts')}</option>
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Search by Centre Name or Taluk */}
        <div className="w-full flex-1">
          <label className="block text-[11px] font-bold text-slate-500 mb-1">
            {lang === 'ta' ? 'மையத்தின் பெயர் அல்லது தாலுகா தேடுக' : 'Search by Name, Taluk, or Address'}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('centres.searchCentres')}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="text-xs text-slate-500 font-semibold self-end pb-2 hidden md:block">
          {lang === 'ta' ? `கண்டறியப்பட்ட மையங்கள்:` : `Centres Found:`} <strong className="text-emerald-800">{centres.length}</strong>
        </div>
      </div>

      {/* Main Grid: Left List + Right Interactive Leaflet Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Centre Cards List */}
        <div className="lg:col-span-6 space-y-4 max-h-[640px] overflow-y-auto pr-1">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-36 bg-slate-100 rounded-2xl animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : centres.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3">
              <MapPin className="w-12 h-12 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-800">
                {lang === 'ta' ? 'மையங்கள் எதுவும் காணப்படவில்லை' : 'No service centres found for the selected criteria.'}
              </p>
              <button
                onClick={() => { setSelectedDistrict('ALL'); setSearchQuery(''); }}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            centres.map((centre) => {
              const isSelected = selectedCentre?.id === centre.id;
              const directionsUrl = centre.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${centre.lat},${centre.lng}`;

              return (
                <div
                  key={centre.id}
                  onClick={() => setSelectedCentre(centre)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                          {centre.type}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          📍 {centre.district} • {centre.taluk}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {lang === 'ta' ? centre.tamilName || centre.name : centre.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {lang === 'ta' ? centre.name : centre.tamilName}
                      </p>
                    </div>

                    {centre.distanceKm !== undefined && (
                      <span className="shrink-0 px-2.5 py-1 bg-emerald-800 text-white rounded-xl text-xs font-extrabold shadow-xs">
                        {centre.distanceKm} km
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {lang === 'ta' ? centre.tamilAddress || centre.address : centre.address}
                  </p>

                  {/* Timings & Phone */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{centre.operatingHours || centre.timing || 'Mon-Sat: 9:30 AM - 5:30 PM'}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="font-semibold">{centre.phone || '044-25619222'}</span>
                    </div>
                  </div>

                  {/* Key Services Tags */}
                  {(centre.servicesProvided || centre.services) && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {(centre.servicesProvided || centre.services).slice(0, 3).map((serv, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                          ✓ {serv}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCentre(centre);
                      }}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                    >
                      <span>🗺️ {lang === 'ta' ? 'வரைபடத்தில் பார்க்க' : 'Focus on Map'}</span>
                    </button>

                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{t('centres.getDirections')}</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Native Leaflet Map */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md flex flex-col h-[640px]">
            {/* Map Header Strip */}
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between text-xs font-bold">
              <div className="flex items-center space-x-2">
                <MapIcon className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ta' ? 'தமிழ்நாடு நேரலை வரைபடம்' : 'Tamil Nadu Interactive Map'}</span>
              </div>
              <span className="text-emerald-300 font-mono text-[11px]">
                {selectedCentre ? `${selectedCentre.district} (${selectedCentre.taluk})` : 'All Tamil Nadu'}
              </span>
            </div>

            {/* Leaflet Map DOM Container */}
            <div 
              ref={mapContainerRef}
              className="flex-1 w-full h-full min-h-[400px] z-10"
              style={{ minHeight: '400px' }}
            />

            {/* Bottom Selected Centre Banner */}
            {selectedCentre && (
              <div className="p-4 bg-emerald-950 text-white border-t border-emerald-900 flex items-center justify-between gap-3">
                <div className="overflow-hidden">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    {selectedCentre.type}
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">
                    {lang === 'ta' ? selectedCentre.tamilName || selectedCentre.name : selectedCentre.name}
                  </h4>
                  <p className="text-[11px] text-slate-300 truncate">
                    {selectedCentre.address}
                  </p>
                </div>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCentre.lat},${selectedCentre.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center space-x-1 transition-all"
                >
                  <span>{t('centres.getDirections')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

export default NearbyCentres;
