import { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Ear, EarOff, Sun, Moon, Type, Accessibility, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccessibilityToolbar = () => {
    const {
        fontSize, setFontSize,
        contrastMode, setContrastMode,
        screenReaderEnabled, setScreenReaderEnabled
    } = useAccessibility();

    const [expanded, setExpanded] = useState(false);

    const increaseFont = () => {
        if (fontSize === 'small') setFontSize('normal');
        else if (fontSize === 'normal') setFontSize('large');
    };

    const decreaseFont = () => {
        if (fontSize === 'large') setFontSize('normal');
        else if (fontSize === 'normal') setFontSize('small');
    };

    const resetFont = () => setFontSize('normal');

    const toggleContrast = () => {
        if (contrastMode === 'light') setContrastMode('dark');
        else if (contrastMode === 'dark') setContrastMode('high-contrast');
        else setContrastMode('light');
    };

    const toggleScreenReader = () => {
        setScreenReaderEnabled((prev) => !prev);
    };

    const contrastIcon = contrastMode === 'light'
        ? <Sun size={14} className="text-amber-300" />
        : contrastMode === 'dark'
            ? <Moon size={14} className="text-indigo-300" />
            : <Type size={14} className="text-white" />;

    const contrastLabel = contrastMode === 'light' ? 'Light' : contrastMode === 'dark' ? 'Dark' : 'High Contrast';

    return (
        <div className="relative z-[100] accessibility-toolbar">
            {/* Thin top bar — always visible */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-9">
                    {/* Left: brand badge */}
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Accessibility size={12} className="text-white" />
                        </div>
                        <span className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase hidden sm:inline">
                            Accessibility
                        </span>
                    </div>

                    {/* Right: compact controls + expand toggle */}
                    <div className="flex items-center gap-2">
                        {/* Quick indicators (always visible) */}
                        <div className="hidden sm:flex items-center gap-1.5 mr-1">
                            {screenReaderEnabled && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                                    <Ear size={10} /> SR ON
                                </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
                                {contrastIcon}
                                <span className="ml-0.5">{contrastLabel}</span>
                            </span>
                            <span className="inline-flex items-center text-[10px] font-medium text-slate-400 bg-white/5 border border-white/10 rounded-full px-2 py-0.5 uppercase">
                                {fontSize}
                            </span>
                        </div>

                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2.5 py-1 transition-all duration-200"
                            aria-label={expanded ? 'Collapse accessibility panel' : 'Expand accessibility panel'}
                        >
                            <span className="hidden sm:inline">{expanded ? 'Close' : 'Options'}</span>
                            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Expandable panel */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                                {/* Screen Reader */}
                                <button
                                    onClick={toggleScreenReader}
                                    className={`group relative flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 ${
                                        screenReaderEnabled
                                            ? 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                                            : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                                    }`}
                                    aria-label={screenReaderEnabled ? 'Disable Screen Reader Enhancements' : 'Enable Screen Reader Enhancements'}
                                    aria-live="polite"
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                                        screenReaderEnabled
                                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30'
                                            : 'bg-white/10 group-hover:bg-white/15'
                                    }`}>
                                        {screenReaderEnabled ? <Ear size={18} className="text-white" /> : <EarOff size={18} className="text-slate-400" />}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-[13px] font-bold text-white leading-tight">Screen Reader</div>
                                        <div className="text-[11px] text-slate-400 mt-0.5">
                                            {screenReaderEnabled ? 'Enhanced — Active' : 'Click to enable'}
                                        </div>
                                    </div>
                                    {screenReaderEnabled && (
                                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse" />
                                    )}
                                </button>

                                {/* Theme / Contrast */}
                                <button
                                    onClick={toggleContrast}
                                    className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                                    aria-label={`Current contrast: ${contrastMode}. Click to change.`}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center shrink-0 group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-all duration-300">
                                        {contrastMode === 'light' && <Sun size={18} className="text-amber-300" />}
                                        {contrastMode === 'dark' && <Moon size={18} className="text-indigo-300" />}
                                        {contrastMode === 'high-contrast' && <Type size={18} className="text-white" />}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-[13px] font-bold text-white leading-tight">Theme</div>
                                        <div className="text-[11px] text-slate-400 mt-0.5">{contrastLabel} — Tap to cycle</div>
                                    </div>
                                </button>

                                {/* Font Size */}
                                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center shrink-0">
                                        <Type size={18} className="text-cyan-300" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[13px] font-bold text-white leading-tight mb-1.5">Font Size</div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={decreaseFont}
                                                disabled={fontSize === 'small'}
                                                className={`w-8 h-7 flex items-center justify-center rounded-lg text-[12px] font-bold transition-all duration-200 ${
                                                    fontSize === 'small'
                                                        ? 'opacity-30 cursor-not-allowed text-slate-500'
                                                        : 'text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                                                }`}
                                                aria-label="Decrease Font Size"
                                            >
                                                A−
                                            </button>
                                            <button
                                                onClick={resetFont}
                                                className={`w-8 h-7 flex items-center justify-center rounded-lg text-[12px] font-bold transition-all duration-200 ${
                                                    fontSize === 'normal'
                                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                                                        : 'text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                                                }`}
                                                aria-label="Reset Font Size"
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={increaseFont}
                                                disabled={fontSize === 'large'}
                                                className={`w-8 h-7 flex items-center justify-center rounded-lg text-[12px] font-bold transition-all duration-200 ${
                                                    fontSize === 'large'
                                                        ? 'opacity-30 cursor-not-allowed text-slate-500'
                                                        : 'text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                                                }`}
                                                aria-label="Increase Font Size"
                                            >
                                                A+
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccessibilityToolbar;
