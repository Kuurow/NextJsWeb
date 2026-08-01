import { useEffect, useRef } from 'react';

/**
 * Fixed full-page backdrop: animated CSS glow (pure radial gradients, no
 * filter:blur) + a linear-vignette horizon, plus the persistent HUD frame
 * (side lines, labels, corner crosshairs).
 */
export default function SiteBackground() {
    const bgRef = useRef<HTMLDivElement>(null);

    // Perf-testing toggles via URL query:
    //   ?static → freeze the glow drift   ?nobg → remove the animated background
    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        const html = document.documentElement;
        if (p.has('static')) html.classList.add('bg-static');
        if (p.has('nobg')) html.classList.add('bg-off');
        return () => html.classList.remove('bg-static', 'bg-off');
    }, []);

    // Freeze the glow drift once scrolled past the first viewport — the blobs are
    // then covered, so pausing costs the GPU nothing while reading content.
    useEffect(() => {
        const bg = bgRef.current;
        if (!bg) return;
        let paused = false;
        function onScroll() {
            const should = window.scrollY > window.innerHeight * 0.9;
            if (should !== paused) {
                paused = should;
                bg!.classList.toggle('glow-paused', paused);
            }
        }
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <div className="site-bg" aria-hidden="true" ref={bgRef}>
                <div className="bg-base" />
                <div className="glow" />
                <div className="glow-secondary" />
                <div className="horizon" />
            </div>

            <div className="tech-deco" aria-hidden="true">
                <div className="side-line left" />
                <div className="side-line right" />
                <div className="side-label left">
                    OFF-GRID SYS <span className="accent">// 01A</span>
                </div>
                <div className="side-label right">
                    KUUROW <span className="accent">&times; 0.77</span>
                </div>
                <div className="crosshair" style={{ left: 40, top: 90, transform: 'translate(-50%, -50%)' }} />
                <div className="crosshair" style={{ right: 40, top: 90, transform: 'translate(50%, -50%)' }} />
            </div>
        </>
    );
}
