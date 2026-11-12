"use client";

import { useEffect, useState } from "react";

import { ToggleButton } from "@/once-ui/components";
import { palettes, style } from "@/app/resources";

type Theme = 'light' | 'dark';

// Same attributes the inline script in the layout sets before the first paint
function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-neutral', palettes[theme].neutral);
    root.setAttribute('data-brand', palettes[theme].brand);
    root.setAttribute('data-accent', palettes[theme].accent);
}

export const ThemeToggle = () => {
    // Unknown until mounted, so the server and first client render match
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => {
        setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

        // Follow the device setting until the visitor picks a theme themselves
        if (style.theme !== 'system') return;
        const media = window.matchMedia('(prefers-color-scheme: light)');
        const onChange = (event: MediaQueryListEvent) => {
            try {
                if (localStorage.getItem('theme')) return;
            } catch {}
            const next = event.matches ? 'light' : 'dark';
            applyTheme(next);
            setTheme(next);
        };
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        applyTheme(next);
        try {
            localStorage.setItem('theme', next);
        } catch {}
        setTheme(next);
    };

    return (
        <ToggleButton
            selected={false}
            prefixIcon={theme === 'light' ? 'moon' : 'sun'}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}/>
    );
};
