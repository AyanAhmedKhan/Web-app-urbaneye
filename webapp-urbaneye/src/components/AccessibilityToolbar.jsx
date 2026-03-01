import { useAccessibility } from '../context/AccessibilityContext';
import { Ear, EarOff, Sun, Moon, Type, ChevronDown } from 'lucide-react';

const AccessibilityToolbar = () => {
    const {
        fontSize, setFontSize,
        contrastMode, setContrastMode,
        screenReaderEnabled, setScreenReaderEnabled
    } = useAccessibility();

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

    return (
        <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-sm z-[100] relative accessibility-toolbar">
            <div className="flex items-center gap-2">
                <span className="font-semibold hidden sm:inline">Accessibility Tools:</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
                {/* Screen Reader Toggle */}
                <button
                    onClick={toggleScreenReader}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors border ${screenReaderEnabled ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
                    aria-label={screenReaderEnabled ? 'Disable Screen Reader Enhancements' : 'Enable Screen Reader Enhancements'}
                    aria-live="polite"
                >
                    {screenReaderEnabled ? <Ear size={16} /> : <EarOff size={16} />}
                    <span className="hidden sm:inline">{screenReaderEnabled ? 'Screen Reader ON' : 'Screen Reader'}</span>
                </button>

                {/* Contrast Toggle */}
                <button
                    onClick={toggleContrast}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors whitespace-nowrap"
                    aria-label={`Current Contrast: ${contrastMode}. Click to change.`}
                >
                    {contrastMode === 'light' && <Sun size={16} className="text-amber-400" />}
                    {contrastMode === 'dark' && <Moon size={16} className="text-indigo-300" />}
                    {contrastMode === 'high-contrast' && <Type size={16} className="text-white" />}
                    <span>Theme: {contrastMode === 'light' ? 'Light' : contrastMode === 'dark' ? 'Dark' : 'High Contrast'}</span>
                </button>

                {/* Font Size Adjustments */}
                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
                    <button
                        onClick={decreaseFont}
                        disabled={fontSize === 'small'}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold transition-colors ${fontSize === 'small' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700'}`}
                        aria-label="Decrease Font Size"
                    >
                        A-
                    </button>
                    <button
                        onClick={resetFont}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold transition-colors ${fontSize === 'normal' ? 'bg-indigo-600' : 'hover:bg-slate-700'}`}
                        aria-label="Reset Font Size"
                    >
                        A
                    </button>
                    <button
                        onClick={increaseFont}
                        disabled={fontSize === 'large'}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold transition-colors ${fontSize === 'large' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-700'}`}
                        aria-label="Increase Font Size"
                    >
                        A+
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityToolbar;
