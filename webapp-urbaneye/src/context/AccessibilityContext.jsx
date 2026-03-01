import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
    return useContext(AccessibilityContext);
};

export const AccessibilityProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState('normal'); // 'small', 'normal', 'large'
    const [contrastMode, setContrastMode] = useState('light'); // 'light', 'dark', 'high-contrast'
    const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

    // Load saved preferences
    useEffect(() => {
        const savedFontSize = localStorage.getItem('accessibility_fontSize');
        const savedContrast = localStorage.getItem('accessibility_contrastMode');
        const savedScreenReader = localStorage.getItem('accessibility_screenReader');

        if (savedFontSize) setFontSize(savedFontSize);
        if (savedContrast) setContrastMode(savedContrast);
        if (savedScreenReader) setScreenReaderEnabled(savedScreenReader === 'true');
    }, []);

    // Apply global classes/styles based on state
    useEffect(() => {
        const root = document.documentElement;

        // Reset classes
        root.classList.remove('font-size-small', 'font-size-large', 'contrast-dark', 'contrast-high', 'screen-reader-mode');

        // Apply Font Size
        if (fontSize === 'small') {
            root.classList.add('font-size-small');
        } else if (fontSize === 'large') {
            root.classList.add('font-size-large');
        }

        // Apply Contrast
        if (contrastMode === 'dark') {
            root.classList.add('contrast-dark');
        } else if (contrastMode === 'high-contrast') {
            root.classList.add('contrast-high');
        }

        // Apply Screen Reader Focus Mode
        if (screenReaderEnabled) {
            root.classList.add('screen-reader-mode');
        }

        // Save to localStorage
        localStorage.setItem('accessibility_fontSize', fontSize);
        localStorage.setItem('accessibility_contrastMode', contrastMode);
        localStorage.setItem('accessibility_screenReader', screenReaderEnabled);
    }, [fontSize, contrastMode, screenReaderEnabled]);

    return (
        <AccessibilityContext.Provider value={{
            fontSize, setFontSize,
            contrastMode, setContrastMode,
            screenReaderEnabled, setScreenReaderEnabled
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
};
