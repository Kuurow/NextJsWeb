import { useEffect, useRef } from 'react';

export default function HeroSection() {
    const containerRef    = useRef<HTMLDivElement>(null);
    const crosshairRef    = useRef<HTMLDivElement>(null);
    const titleBlockRef   = useRef<HTMLDivElement>(null);
    const hlCrossRef      = useRef<HTMLDivElement>(null);
    const hlTopRef        = useRef<HTMLDivElement>(null);
    const hlBotRef        = useRef<HTMLDivElement>(null);
    const bracketRRef     = useRef<HTMLDivElement>(null);
    const endcapBotRef    = useRef<HTMLDivElement>(null);
    const endcapCrossRef  = useRef<HTMLDivElement>(null);
    const annIndexRef     = useRef<HTMLSpanElement>(null);
    const annSeqRef       = useRef<HTMLSpanElement>(null);
    const annCrossRRef    = useRef<HTMLSpanElement>(null);

    // Fade targets
    const heroRef         = useRef<HTMLDivElement>(null);
    const chromeRef       = useRef<HTMLDivElement>(null);
    const taglineRef      = useRef<HTMLDivElement>(null);

    // ── Chrome layout ──────────────────────────────────────────────────────
    // All chrome elements are position:absolute inside .ns-hero-wrap, so we
    // convert getBoundingClientRect() viewport coords to container-relative
    // coords by subtracting the container's own top offset.
    useEffect(() => {
        function layout() {
            const container = containerRef.current;
            const crossEl   = crosshairRef.current;
            const titleEl   = titleBlockRef.current;
            if (!container || !crossEl || !titleEl) return;

            const origin = container.getBoundingClientRect().top;
            const cr = crossEl.getBoundingClientRect();
            const tr = titleEl.getBoundingClientRect();

            const crossY = cr.top - origin + cr.height * 0.5;
            const titleT = tr.top    - origin;
            const titleB = tr.bottom - origin;
            const titleL = tr.left;   // horizontal coords need no adjustment
            const titleR = tr.right;

            function s(ref: React.RefObject<HTMLElement | null>, styles: Record<string, string>) {
                if (ref.current) Object.assign(ref.current.style, styles);
            }

            s(hlCrossRef,    { left: '0', top: crossY + 'px', width: (titleR + 56) + 'px' });
            s(endcapCrossRef,{ left: (titleR + 56) + 'px', top: (crossY - 4) + 'px' });
            s(annCrossRRef,  { left: (titleR + 64) + 'px', top: (crossY - 8) + 'px' });

            s(hlTopRef, {
                left:  (titleL - 52) + 'px',
                top:   titleT + 'px',
                width: (titleR - titleL + 120) + 'px',
            });
            s(annIndexRef, { left: (titleR + 72) + 'px', top: (titleT - 10) + 'px' });

            s(hlBotRef,   { left: (titleL - 52) + 'px', top: titleB + 'px', width: '72vw' });
            s(endcapBotRef, { left: `calc(${titleL - 52}px + 72vw)`, top: (titleB - 4) + 'px' });
            s(annSeqRef,  { left: `calc(${titleL - 52}px + 72vw - 60px)`, top: (titleB + 6) + 'px' });

            const bracketH = titleB - titleT;
            if (bracketRRef.current) {
                Object.assign(bracketRRef.current.style, {
                    left:   (titleR + 28) + 'px',
                    top:    titleT + 'px',
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

    // ── Scroll fade ────────────────────────────────────────────────────────
    // Hero is now in document flow (100vh). Fade starts at 40 % scroll,
    // completes at 100 % (just as the first section enters the viewport).
    useEffect(() => {
        function onScroll() {
            const vh       = window.innerHeight;
            const raw      = (window.scrollY - vh * 0.4) / (vh * 0.4);
            const progress = Math.min(Math.max(raw, 0), 1);
            const opacity  = String(1 - progress * 0.92);

            if (heroRef.current)    heroRef.current.style.opacity    = opacity;
            if (chromeRef.current)  chromeRef.current.style.opacity  = opacity;
            if (taglineRef.current) taglineRef.current.style.opacity = opacity;
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div ref={containerRef} className="ns-hero-wrap">
            {/* Dynamic chrome lines — grouped for unified fade */}
            <div ref={chromeRef} className="ns-chrome-group">
                <div ref={hlCrossRef}     className="ns-hl-cross   md:block hidden" />
                <div ref={hlTopRef}       className="ns-hl-top     md:block hidden" />
                <div ref={hlBotRef}       className="ns-hl-bot     md:block hidden" />
                <div ref={bracketRRef}    className="ns-bracket-r  md:block hidden" />
                <div ref={endcapBotRef}   className="ns-endcap     md:block hidden" />
                <div ref={endcapCrossRef} className="ns-endcap     md:block hidden" />
                <span ref={annIndexRef}   className="ns-chrome-ann md:block hidden">— 01</span>
                <span ref={annSeqRef}     className="ns-chrome-ann md:block hidden">A / KUUROW</span>
                <span ref={annCrossRRef}  className="ns-chrome-ann md:block hidden">× 0.77</span>
            </div>

            {/* Hero */}
            <div ref={heroRef} className="ns-hero">
                <div className="ns-chrome-col">
                    <div ref={crosshairRef} className="ns-crosshair" />
                    <div className="ns-vline" />
                    <div className="ns-htick" />
                </div>
                <div ref={titleBlockRef} className="ns-title-block">
                    <span className="ns-title-line">Off</span>
                    <span className="ns-title-line">Grid</span>
                    <span className="ns-title-line">By</span>
                    <span className="ns-title-line">Choice</span>
                </div>
            </div>

            {/* Tagline strip */}
            <div ref={taglineRef} className="ns-tagline-strip">
                <span className="ns-tagline-text">where things slow down for a moment</span>
                <div className="ns-tagline-divider" />
                <span className="ns-tagline-coord">48.07°N &nbsp;&nbsp; 0.77°W</span>
            </div>
        </div>
    );
}
