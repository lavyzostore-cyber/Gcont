import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, Check, Sparkles, X, Eye } from 'lucide-react';
import { ThemeId } from '../types/theme';

export const ThemeSelector: React.FC = () => {
  const { currentTheme, themeId, setTheme, availableThemes } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {/* Top Bar Switcher Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all backdrop-blur-md cursor-pointer"
          style={{
            borderColor: currentTheme.borderFocus,
            backgroundColor: `${currentTheme.bgCard}cc`,
            color: '#FFFFFF',
          }}
          title="Select Editorial Colorway (From Reference Posters)"
          aria-label="Select Poster Colorway"
        >
          <span
            className="w-2.5 h-2.5 rounded-full shadow-sm animate-pulse"
            style={{ backgroundColor: currentTheme.primary }}
          />
          <span className="hidden lg:inline text-slate-300">Grade:</span>
          <span style={{ color: currentTheme.primaryLight }} className="font-medium">
            {currentTheme.name}
          </span>
          <Palette className="w-3.5 h-3.5 opacity-75" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setDropdownOpen(false)}
            />
            <div
              className="absolute right-0 mt-2 w-72 rounded-xl p-2.5 shadow-2xl z-50 border backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
              style={{
                backgroundColor: currentTheme.bgCard,
                borderColor: currentTheme.borderFocus,
                boxShadow: `0 15px 35px -5px ${currentTheme.glow}`,
              }}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-1">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Poster Colorways
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    setModalOpen(true);
                  }}
                  className="text-[10px] font-semibold text-slate-300 hover:text-white flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                >
                  <Eye className="w-3 h-3" /> View Posters
                </button>
              </div>

              <div className="space-y-1.5">
                {availableThemes.map((theme) => {
                  const isActive = theme.id === themeId;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        setTheme(theme.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'ring-1 font-semibold text-white'
                          : 'hover:bg-white/5 text-slate-300 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: isActive ? `${theme.badgeBg}` : 'transparent',
                        borderColor: isActive ? theme.borderFocus : 'transparent',
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-white">{theme.name}</span>
                          <span className="text-[10px] text-slate-400">
                            {theme.posterLabel}
                          </span>
                        </div>
                      </div>
                      {isActive && (
                        <Check className="w-4 h-4" style={{ color: theme.primary }} />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/10 text-center">
                <p className="text-[10px] text-slate-400">
                  Customized from official automotive reference posters
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Full Modal to inspect reference posters and preview colorways */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 border shadow-2xl relative"
            style={{
              backgroundColor: currentTheme.bgCard,
              borderColor: currentTheme.borderFocus,
              boxShadow: `0 25px 60px -15px ${currentTheme.glow}`,
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Official Poster Colorway Studio
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Crafted directly from the high-end automotive posters for G Contreras Mobile Detailing
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Poster 1: Ruby Crimson */}
              <div
                className={`flex flex-col rounded-xl overflow-hidden border transition-all ${
                  themeId === 'obsidian-crimson' ? 'ring-2 ring-rose-500 shadow-lg' : 'hover:border-white/30'
                }`}
                style={{ backgroundColor: '#0D0D10', borderColor: 'rgba(190, 18, 60, 0.3)' }}
              >
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img
                    src="/assets/aistudio/Corner1_857fb3c2.png"
                    alt="Poster 1 - The Finish Is In The Details"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-rose-300 border border-rose-500/40">
                    Poster 1
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h4 className="font-editorial font-bold text-base text-white tracking-wide">
                      Obsidian & Crimson
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      "The finish is in the details." Precision darkroom monochrome with rich ruby accents.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTheme('obsidian-crimson')}
                    className="w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    style={{
                      backgroundColor: themeId === 'obsidian-crimson' ? '#BE123C' : 'rgba(190, 18, 60, 0.15)',
                      color: '#FFFFFF',
                      border: '1px solid #BE123C',
                    }}
                  >
                    {themeId === 'obsidian-crimson' ? 'Active Colorway' : 'Apply Crimson Palette'}
                  </button>
                </div>
              </div>

              {/* Poster 2: Studio Racing Green */}
              <div
                className={`flex flex-col rounded-xl overflow-hidden border transition-all ${
                  themeId === 'racing-emerald' ? 'ring-2 ring-emerald-500 shadow-lg' : 'hover:border-white/30'
                }`}
                style={{ backgroundColor: '#0B130F', borderColor: 'rgba(16, 185, 129, 0.3)' }}
              >
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img
                    src="/assets/aistudio/Corner2_1005170c.png"
                    alt="Poster 2 - Premium Car Care"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-emerald-300 border border-emerald-500/40">
                    Poster 2
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h4 className="font-editorial font-bold text-base text-white tracking-wide">
                      Racing Emerald
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      "Premium Car Care." Pure daylight studio gloss, microfiber care, deep British racing emerald.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTheme('racing-emerald')}
                    className="w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    style={{
                      backgroundColor: themeId === 'racing-emerald' ? '#10B981' : 'rgba(16, 185, 129, 0.15)',
                      color: themeId === 'racing-emerald' ? '#062015' : '#FFFFFF',
                      border: '1px solid #10B981',
                    }}
                  >
                    {themeId === 'racing-emerald' ? 'Active Colorway' : 'Apply Emerald Palette'}
                  </button>
                </div>
              </div>

              {/* Poster 3: Sunset Bronze & Champagne */}
              <div
                className={`flex flex-col rounded-xl overflow-hidden border transition-all ${
                  themeId === 'sunset-bronze' ? 'ring-2 ring-amber-500 shadow-lg' : 'hover:border-white/30'
                }`}
                style={{ backgroundColor: '#14120E', borderColor: 'rgba(212, 175, 55, 0.3)' }}
              >
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img
                    src="/assets/aistudio/Corner3_de23fe95.png"
                    alt="Poster 3 - Cleaner. Shinier. Better."
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-amber-300 border border-amber-500/40">
                    Poster 3 (Recommended)
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h4 className="font-editorial font-bold text-base text-white tracking-wide">
                      Sunset Bronze & Gold
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      "Cleaner. Shinier. Better." Warm golden hour reflections across freshly polished BMW bodywork.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTheme('sunset-bronze')}
                    className="w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    style={{
                      backgroundColor: themeId === 'sunset-bronze' ? '#D4AF37' : 'rgba(212, 175, 55, 0.15)',
                      color: themeId === 'sunset-bronze' ? '#0A0908' : '#FFFFFF',
                      border: '1px solid #D4AF37',
                    }}
                  >
                    {themeId === 'sunset-bronze' ? 'Active Colorway' : 'Apply Bronze Palette'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                <span>Currently active: <strong className="text-white">{currentTheme.name}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="py-1.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
              >
                Done Previewing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
