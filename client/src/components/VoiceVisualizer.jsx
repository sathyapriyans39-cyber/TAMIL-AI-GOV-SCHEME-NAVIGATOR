/**
 * VoiceVisualizer Component
 * Elegant glowing soundwave audio visualizer, real-time live transcript display,
 * and high-clarity voice playback control bar.
 */

import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Pause, 
  Play, 
  Square, 
  Mic, 
  Sparkles, 
  Sliders,
  FastForward,
  Gauge
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function VoiceVisualizer({
  isListening = false,
  isSpeaking = false,
  isPaused = false,
  transcript = '',
  speakingText = '',
  progress = null,
  speechRate = 0.95,
  onRateChange = null,
  onPause = null,
  onResume = null,
  onStop = null
}) {
  const { lang } = useLanguage();

  if (!isListening && !isSpeaking) return null;

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl border border-emerald-500/40 animate-slide-up space-y-3">
      
      {/* Top Status Strip */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {isListening ? (
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute" />
              <div className="w-7 h-7 rounded-xl bg-red-600/80 text-white flex items-center justify-center z-10 shadow-md">
                <Mic className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Volume2 className="w-4 h-4" />
            </div>
          )}

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black tracking-tight text-white">
                {isListening 
                  ? (lang === 'ta' ? 'குரலை பதிவு செய்கிறது (Listening...)' : 'Listening to your Voice...') 
                  : (lang === 'ta' ? 'தெளிவான குரல் வாசிப்பு (High-Clarity Voice AI)' : 'High-Clarity Voice Narration')
                }
              </span>
              <span className="px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                HD Audio
              </span>
            </div>

            <p className="text-[11px] text-slate-300 font-medium">
              {isListening 
                ? (lang === 'ta' ? 'இப்போது பேசவும் (தமிழ் அல்லது English)' : 'Speak clearly in English, Tamil, or Tanglish') 
                : (progress ? `Sentence ${progress.chunkIndex + 1} of ${progress.totalChunks}` : 'Natural Speech Prosody Active')
              }
            </p>
          </div>
        </div>

        {/* Playback Controls (When speaking) */}
        {isSpeaking && (
          <div className="flex items-center space-x-2">
            {/* Speed Rate Pill */}
            {onRateChange && (
              <div className="hidden sm:flex items-center bg-slate-800/80 rounded-xl p-1 border border-slate-700 text-[10px] font-bold">
                <span className="text-slate-400 px-1.5 flex items-center">
                  <Gauge className="w-3 h-3 mr-1" />
                </span>
                {[0.85, 0.95, 1.15].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => onRateChange(rate)}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      Math.abs(speechRate - rate) < 0.05 
                        ? 'bg-emerald-600 text-white shadow-2xs' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {rate === 0.85 ? '0.8x' : rate === 0.95 ? '1.0x' : '1.2x'}
                  </button>
                ))}
              </div>
            )}

            {/* Pause / Resume */}
            {isPaused ? (
              <button
                onClick={onResume}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
                title="Resume Voice"
              >
                <Play className="w-4 h-4 fill-white" />
              </button>
            ) : (
              <button
                onClick={onPause}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
                title="Pause Voice"
              >
                <Pause className="w-4 h-4" />
              </button>
            )}

            {/* Stop */}
            <button
              onClick={onStop}
              className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white shadow-md transition-all"
              title="Stop Narration"
            >
              <Square className="w-4 h-4 fill-white" />
            </button>
          </div>
        )}
      </div>

      {/* Animated Glowing Soundwave Bars */}
      <div className="flex items-center justify-center space-x-1.5 py-1.5">
        <span className="w-1 bg-emerald-400 rounded-full animate-wave-1 shadow-sm shadow-emerald-400" />
        <span className="w-1 bg-teal-300 rounded-full animate-wave-2 shadow-sm shadow-teal-300" />
        <span className="w-1 bg-emerald-500 rounded-full animate-wave-3 shadow-sm shadow-emerald-500" />
        <span className="w-1 bg-amber-400 rounded-full animate-wave-4 shadow-sm shadow-amber-400" />
        <span className="w-1 bg-emerald-300 rounded-full animate-wave-5 shadow-sm shadow-emerald-300" />
        <span className="w-1 bg-teal-400 rounded-full animate-wave-2 shadow-sm shadow-teal-400" />
        <span className="w-1 bg-emerald-400 rounded-full animate-wave-1 shadow-sm shadow-emerald-400" />
        <span className="w-1 bg-amber-300 rounded-full animate-wave-3 shadow-sm shadow-amber-300" />
        <span className="w-1 bg-teal-500 rounded-full animate-wave-4 shadow-sm shadow-teal-500" />
        <span className="w-1 bg-emerald-400 rounded-full animate-wave-2 shadow-sm shadow-emerald-400" />
      </div>

      {/* Real-time Spoken Text or Live Transcript Box */}
      {(transcript || speakingText) && (
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-emerald-500/20 text-xs text-slate-200 leading-relaxed font-medium">
          <span className="text-emerald-400 font-bold mr-1.5">
            {isListening ? '🎙️ ' : '🗣️ '}
          </span>
          <span className="italic">
            "{isListening ? transcript : speakingText}"
          </span>
        </div>
      )}

    </div>
  );
}

export default VoiceVisualizer;
