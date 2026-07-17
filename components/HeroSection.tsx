import { useEffect, useState } from 'react';

export default function HeroSection() {
    const [clock, setClock] = useState('');

    // Live date/time readout, technical HUD style (yyyy-mm-dd / HH:MM:SS).
    useEffect(() => {
        function update() {
            const now = new Date();
            const date = now.toLocaleDateString('en-CA');
            const time = now.toLocaleTimeString('en-GB');
            setClock(`${date} / ${time}`);
        }
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="hero">
            <div className="hero-corner tl" />
            <div className="hero-corner tr" />
            <div className="hero-corner bl" />
            <div className="hero-corner br" />

            <div className="coords" suppressHydrationWarning>{clock}</div>

            <div className="hero-content">
                <div className="hero-logo">
                    {/* Temporary geometric K monogram — placeholder until the real logo lands */}
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M34 22 V78"
                            stroke="var(--ink)"
                            strokeWidth="9"
                            strokeLinecap="round"
                            opacity="0.9"
                        />
                        <path
                            d="M34 50 L66 22"
                            stroke="var(--ink)"
                            strokeWidth="9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.9"
                        />
                        <path
                            d="M34 50 L66 78"
                            stroke="var(--accent)"
                            strokeWidth="9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <div className="scroll-hint">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </div>
        </div>
    );
}
