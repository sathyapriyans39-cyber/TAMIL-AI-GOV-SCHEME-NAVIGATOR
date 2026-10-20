/**
 * Tamil Nadu e-Sevai Centres Interactive Map Module
 * Powered by Leaflet.js with custom markers, popup details, nearest-centre finder, and district fly-to.
 */

let centresMap = null;
let markersGroup = null;
let userMarker = null;
let currentCentresData = [];

// Default Tamil Nadu state center & bounds
const TN_DEFAULT_CENTER = [11.1271, 78.6569];
const TN_DEFAULT_ZOOM = 7;

/**
 * Initialize Leaflet Map for e-Sevai Centres
 */
function initCentresMap() {
  const mapElement = document.getElementById('centresMap');
  if (!mapElement || centresMap) return;

  // Create Leaflet map instance
  centresMap = L.map('centresMap', {
    center: TN_DEFAULT_CENTER,
    zoom: TN_DEFAULT_ZOOM,
    zoomControl: true,
    scrollWheelZoom: false // Prevent unwanted zooming while scrolling page
  });

  // Enable scroll zoom only when map is clicked / focused
  centresMap.on('focus', () => { centresMap.scrollWheelZoom.enable(); });
  centresMap.on('blur', () => { centresMap.scrollWheelZoom.disable(); });

  // Add OpenStreetMap Tile Layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  }).addTo(centresMap);

  // Initialize Marker Cluster / Feature Group
  markersGroup = L.featureGroup().addTo(centresMap);

  // If centres were already fetched, render them
  if (currentCentresData && currentCentresData.length > 0) {
    updateCentresMap(currentCentresData);
  }
}

/**
 * Update map markers when district or search filter changes
 */
function updateCentresMap(centresList) {
  currentCentresData = centresList || [];

  if (!centresMap) {
    initCentresMap();
    return;
  }

  if (!markersGroup) {
    markersGroup = L.featureGroup().addTo(centresMap);
  }

  // Clear previous centre markers
  markersGroup.clearLayers();

  const isTamil = (localStorage.getItem('app_lang') || 'ta') === 'ta';
  const countBadge = document.getElementById('mapCentresCount');
  if (countBadge) {
    countBadge.textContent = isTamil
      ? `${currentCentresData.length} மையங்கள்`
      : `${currentCentresData.length} Centres`;
  }

  if (!currentCentresData || currentCentresData.length === 0) {
    return;
  }

  // Create markers for each centre with valid lat/lng
  currentCentresData.forEach(centre => {
    if (!centre.lat || !centre.lng) return;

    const name = isTamil ? (centre.tamilName || centre.name) : centre.name;
    const address = isTamil ? (centre.tamilAddress || centre.address) : centre.address;
    const taluk = centre.taluk ? `${centre.taluk}, ${centre.district}` : centre.district;
    const phone = centre.phone || centre.contactPhone || '1100';
    const hours = centre.operatingHours || '09:30 AM - 05:30 PM';
    const directionsUrl = centre.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${centre.lat},${centre.lng}`;

    // Custom Government Emblem Pin
    const customIcon = L.divIcon({
      className: 'custom-map-pin-container',
      html: `
        <div class="custom-map-pin" title="${name}">
          <span class="pin-emblem">🏛️</span>
        </div>
      `,
      iconSize: [36, 42],
      iconAnchor: [18, 42],
      popupAnchor: [0, -38]
    });

    const marker = L.marker([centre.lat, centre.lng], {
      icon: customIcon,
      title: name,
      riseOnHover: true
    });

    // Custom Popup Content
    const popupContent = `
      <div class="map-popup-card">
        <div class="map-popup-header">
          <span class="map-popup-badge">🏛️ e-Sevai</span>
          <h4 class="map-popup-title">${name}</h4>
        </div>
        <div class="map-popup-body">
          <p class="map-popup-address">📍 ${address}</p>
          <div class="map-popup-meta">
            <div>⏰ <strong>${isTamil ? 'நேரம்' : 'Hours'}:</strong> ${hours}</div>
            <div>📞 <strong>${isTamil ? 'தொடர்பு' : 'Phone'}:</strong> ${phone}</div>
          </div>
        </div>
        <div class="map-popup-footer">
          <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn-popup-directions">
            🧭 ${isTamil ? 'கூகிள் வரைபடத்தில் வழிகாட்டி ↗' : 'Get Directions (Google Maps) ↗'}
          </a>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, { maxWidth: 300, minWidth: 260 });
    marker.centreId = centre.id;
    markersGroup.addLayer(marker);
  });

  // Fit map bounds to show all markers if any exist
  try {
    const bounds = markersGroup.getBounds();
    if (bounds.isValid()) {
      centresMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  } catch (e) {
    // Keep default center
  }
}

/**
 * Focus and zoom into a specific centre on the map
 */
function focusCentreOnMap(centreId) {
  const mapElement = document.getElementById('centresMap');
  if (!mapElement) return;

  // Scroll smoothly to map
  mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

  if (!centresMap || !markersGroup) return;

  const centre = currentCentresData.find(c => c.id === centreId);
  if (!centre || !centre.lat || !centre.lng) return;

  // Fly to centre coordinates
  centresMap.flyTo([centre.lat, centre.lng], 15, {
    duration: 1.2
  });

  // Find and open popup
  markersGroup.eachLayer(layer => {
    if (layer.centreId === centreId) {
      setTimeout(() => {
        layer.openPopup();
      }, 700);
    }
  });
}

/**
 * Reset map to whole Tamil Nadu state view
 */
function resetMapView() {
  if (!centresMap) return;

  if (markersGroup && markersGroup.getLayers().length > 0) {
    try {
      const bounds = markersGroup.getBounds();
      if (bounds.isValid()) {
        centresMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
        return;
      }
    } catch (e) {}
  }

  centresMap.flyTo(TN_DEFAULT_CENTER, TN_DEFAULT_ZOOM, { duration: 1 });
}

/**
 * Locate user on map and find nearest e-Sevai centres
 */
function locateUserOnMap() {
  const isTamil = (localStorage.getItem('app_lang') || 'ta') === 'ta';

  if (!navigator.geolocation) {
    showToast(isTamil ? 'உங்கள் உலாவியில் இருப்பிட சேவை ஆதரிக்கப்படவில்லை.' : 'Geolocation is not supported by your browser.', 'info');
    return;
  }

  showToast(isTamil ? '📍 உங்கள் இருப்பிடம் கண்டறியப்படுகிறது...' : '📍 Finding your current location...', 'info');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      if (!centresMap) initCentresMap();

      // Add or update pulsing user marker
      if (userMarker) {
        centresMap.removeLayer(userMarker);
      }

      const userIcon = L.divIcon({
        className: 'user-map-pin-container',
        html: `
          <div class="user-map-pin">
            <div class="user-pulse"></div>
            <div class="user-dot"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      userMarker = L.marker([userLat, userLng], { icon: userIcon }).addTo(centresMap);
      userMarker.bindPopup(`<strong>📍 ${isTamil ? 'உங்கள் இருப்பிடம்' : 'You are here'}</strong>`).openPopup();

      // Calculate distances to all centres
      if (currentCentresData && currentCentresData.length > 0) {
        const withDistances = currentCentresData.map(c => {
          const d = calculateDistanceKm(userLat, userLng, c.lat, c.lng);
          return { ...c, distanceKm: d };
        });

        withDistances.sort((a, b) => a.distanceKm - b.distanceKm);
        const nearest = withDistances[0];

        // Zoom map to include both user and nearest centre
        const nearestLatLng = L.latLng(nearest.lat, nearest.lng);
        const userLatLng = L.latLng(userLat, userLng);
        const group = L.featureGroup([L.marker(userLatLng), L.marker(nearestLatLng)]);
        centresMap.fitBounds(group.getBounds(), { padding: [60, 60], maxZoom: 14 });

        const nearestName = isTamil ? (nearest.tamilName || nearest.name) : nearest.name;
        showToast(
          isTamil
            ? `📍 மிக அருகில் உள்ள மையம்: ${nearestName} (~${nearest.distanceKm.toFixed(1)} கி.மீ)`
            : `📍 Closest centre: ${nearestName} (~${nearest.distanceKm.toFixed(1)} km)`,
          'success'
        );
      } else {
        centresMap.flyTo([userLat, userLng], 13);
      }
    },
    (err) => {
      console.warn('Geolocation error:', err);
      showToast(
        isTamil
          ? 'இருப்பிடத்தை கண்டறிய முடியவில்லை. உலாவி அனுமதியை சரிபார்க்கவும்.'
          : 'Unable to retrieve location. Please check browser permissions.',
        'error'
      );
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}

/**
 * Haversine Formula for distance in km between two lat/lng points
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Global exposure
window.initCentresMap = initCentresMap;
window.updateCentresMap = updateCentresMap;
window.focusCentreOnMap = focusCentreOnMap;
window.resetMapView = resetMapView;
window.locateUserOnMap = locateUserOnMap;
