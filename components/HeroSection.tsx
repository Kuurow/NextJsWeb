import { useEffect, useRef } from 'react';

export default function HeroSection() {
    const crosshairRef = useRef<HTMLDivElement>(null);
    const titleBlockRef = useRef<HTMLDivElement>(null);
    const hlCrossRef    = useRef<HTMLDivElement>(null);
    const hlTopRef      = useRef<HTMLDivElement>(null);
    const hlBotRef      = useRef<HTMLDivElement>(null);
    const bracketRRef   = useRef<HTMLDivElement>(null);
    const endcapBotRef  = useRef<HTMLDivElement>(null);
    const endcapCrossRef = useRef<HTMLDivElement>(null);
    const annIndexRef   = useRef<HTMLSpanElement>(null);
    const annSeqRef     = useRef<HTMLSpanElement>(null);
    const annCrossRRef  = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        function layout() {
            const crossEl = crosshairRef.current;
            const titleEl = titleBlockRef.current;
            if (!crossEl || !titleEl) return;

            const cr = crossEl.getBoundingClientRect();
            const tr = titleEl.getBoundingClientRect();
            const crossY = cr.top + cr.height * 0.5;
            const { top: titleT, bottom: titleB, left: titleL, right: titleR } = tr;

            function s(ref: React.RefObject<HTMLElement | null>, styles: Record<string, string>) {
                if (ref.current) Object.assign(ref.current.style, styles);
            }

            s(hlCrossRef, { left: '0', top: crossY + 'px', width: (titleR + 56) + 'px' });
            s(endcapCrossRef, { left: (titleR + 56) + 'px', top: (crossY - 4) + 'px' });
            s(annCrossRRef, { left: (titleR + 64) + 'px', top: (crossY - 8) + 'px' });

            s(hlTopRef, {
                left: (titleL - 52) + 'px',
                top: titleT + 'px',
                width: (titleR - titleL + 120) + 'px',
            });
            s(annIndexRef, { left: (titleR + 72) + 'px', top: (titleT - 10) + 'px' });

            s(hlBotRef, { left: (titleL - 52) + 'px', top: titleB + 'px', width: '72vw' });
            s(endcapBotRef, { left: `calc(${titleL - 52}px + 72vw)`, top: (titleB - 4) + 'px' });
            s(annSeqRef, { left: `calc(${titleL - 52}px + 72vw - 60px)`, top: (titleB + 6) + 'px' });

            const bracketH = titleB - titleT;
            if (bracketRRef.current) {
                Object.assign(bracketRRef.current.style, {
                    left: (titleR + 28) + 'px',
                    top: titleT + 'px',
                    height: bracketH + 'px',
                });
                bracketRRef.current.style.setProperty('--bracket-h', bracketH + 'px');
            }
        }

        document.fonts.ready.then(() => {
            layout();
            window.addEventListener('resize', layout);
        });

        return () => window.removeEventListener('resize', layout);
    }, []);

    return (
        <>
            {/* Dynamic chrome lines */}
            <div ref={hlCrossRef}    className="ns-hl-cross   md:block hidden" />
            <div ref={hlTopRef}      className="ns-hl-top     md:block hidden" />
            <div ref={hlBotRef}      className="ns-hl-bot     md:block hidden" />
            <div ref={bracketRRef}   className="ns-bracket-r  md:block hidden" />
            <div ref={endcapBotRef}  className="ns-endcap     md:block hidden" />
            <div ref={endcapCrossRef} className="ns-endcap    md:block hidden" />
            <span ref={annIndexRef}  className="ns-chrome-ann md:block hidden">— 01</span>
            <span ref={annSeqRef}    className="ns-chrome-ann md:block hidden">A / KUUROW</span>
            <span ref={annCrossRRef} className="ns-chrome-ann md:block hidden">× 0.77</span>

            {/* Hero */}
            <div className="ns-hero">
                <div className="ns-chrome-col">
                    <div ref={crosshairRef} className="ns-crosshair" />
                    <div className="ns-vline" />
                    <div className="ns-htick" />
                </div>
                <div ref={titleBlockRef} className="ns-title-block">
                    <span className="ns-title-line">A</span>
                    <span className="ns-title-line">Neo</span>
                    <span className="ns-title-line">Serenity</span>
                    <span className="ns-title-line">Experience</span>
                </div>
            </div>

            {/* Tagline strip */}
            <div className="ns-tagline-strip">
                <span className="ns-tagline-text">Feel the stillness in motion</span>
                <div className="ns-tagline-divider" />
                <span className="ns-tagline-coord">48.07°N &nbsp;&nbsp; 0.77°W</span>
            </div>
        </>
    );
}
