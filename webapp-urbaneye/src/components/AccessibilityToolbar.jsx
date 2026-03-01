import { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { Ear, EarOff, Sun, Moon, Type } from 'lucide-react';

const AccessibilityToolbar = () => {
    const {
        fontSize, setFontSize,
        contrastMode, setContrastMode,
        screenReaderEnabled, setScreenReaderEnabled
    } = useAccessibility();

    const [language, setLanguage] = useState('English');

    const increaseFont = () => {
        if (fontSize === 'small') setFontSize('normal');
        else if (fontSize === 'normal') setFontSize('large');
    };

    const decreaseFont = () => {
        if (fontSize === 'large') setFontSize('normal');
        else if (fontSize === 'normal') setFontSize('small');
    };

    const toggleContrast = () => {
        if (contrastMode === 'light') setContrastMode('dark');
        else if (contrastMode === 'dark') setContrastMode('high-contrast');
        else setContrastMode('light');
    };

    const toggleScreenReader = () => {
        setScreenReaderEnabled((prev) => !prev);
    };

    const fontLabel = fontSize === 'small' ? 'A' : fontSize === 'normal' ? 'A' : 'A';

    return (
        <div className="relative z-[100] accessibility-toolbar">
            <div className="bg-[#1a2332] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-9">
                        {/* Left: Skip to main content */}
                        <a
                            href="#main-content"
                            className="text-[11px] font-medium text-slate-300 hover:text-white transition-colors focus:outline-none focus:text-white"
                        >
                            Skip to Main Content
                        </a>

                        {/* Right: all controls in a row */}
                        <div className="flex items-center divide-x divide-white/15">

                            {/* Theme / Contrast toggle */}
                            <button
                                onClick={toggleContrast}
                                className="flex items-center gap-1.5 px-3 h-9 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                                aria-label={`Current theme: ${contrastMode}. Click to change.`}
                                title="Toggle contrast mode"
                            >
                                {contrastMode === 'light' && <Sun size={13} className="text-amber-300" />}
                                {contrastMode === 'dark' && <Moon size={13} className="text-indigo-300" />}
                                {contrastMode === 'high-contrast' && <Type size={13} className="text-white" />}
                                <span className="hidden sm:inline">
                                    {contrastMode === 'light' ? 'Light' : contrastMode === 'dark' ? 'Dark' : 'Hi-Con'}
                                </span>
                            </button>

                            {/* Font Size controls */}
                            <div className="flex items-center h-9">
                                <button
                                    onClick={increaseFont}
                                    disabled={fontSize === 'large'}
                                    className="flex items-center justify-center w-8 h-9 text-[13px] font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    aria-label="Increase font size"
                                    title="Increase font size"
                                >
                                    +A
                                </button>
                                <span className="text-[14px] font-black text-white px-1">A</span>
                                <button
                                    onClick={decreaseFont}
                                    disabled={fontSize === 'small'}
                                    className="flex items-center justify-center w-8 h-9 text-[11px] font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    aria-label="Decrease font size"
                                    title="Decrease font size"
                                >
                                    -A
                                </button>
                            </div>

                            {/* Screen Reader */}
                            <button
                                onClick={toggleScreenReader}
                                className={`flex items-center gap-1.5 px-3 h-9 text-[11px] font-semibold transition-all ${
                                    screenReaderEnabled
                                        ? 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/15'
                                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                                aria-label={screenReaderEnabled ? 'Disable Screen Reader' : 'Enable Screen Reader'}
                                title="Toggle screen reader mode"
                            >
                                {screenReaderEnabled ? <Ear size={13} /> : <EarOff size={13} />}
                                <span className="hidden sm:inline">Screen Reader</span>
                            </button>

                            {/* Language selector */}
                            <div className="relative">
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="appearance-none bg-transparent px-3 h-9 text-[11px] font-semibold text-slate-300 hover:text-white cursor-pointer focus:outline-none"
                                    aria-label="Select language"
                                >
                                    <option value="English" className="bg-[#1a2332] text-white">English</option>
                                    <option value="हिन्दी" className="bg-[#1a2332] text-white">हिन्दी</option>
                                    <option value="தமிழ்" className="bg-[#1a2332] text-white">தமிழ்</option>
                                    <option value="తెలుగు" className="bg-[#1a2332] text-white">తెలుగు</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityToolbar;
