import { useEffect, useRef } from 'react';

/**
 * Fixed full-page backdrop: animated CSS glow + radial horizon + a static
 * film-grain noise canvas, plus the persistent HUD frame (side lines, labels,
 * corner crosshairs). Replaces the former WebGL AuroraCanvas.
 */
export default function SiteBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const off = document.createElement('canvas');
        const offCtx = off.getContext('2d');
        if (!offCtx) return;

        function draw() {
            if (!canvas || !ctx || !offCtx) return;
            const dpr = window.devicePixelRatio || 1;
            const w = Math.floor(window.innerWidth * dpr);
            const h = Math.floor(window.innerHeight * dpr);
            canvas.width = w;
            canvas.height = h;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            off.width = w;
            off.height = h;

            const imageData = offCtx.createImageData(w, h);
            const buffer = imageData.data;
            for (let i = 0; i < buffer.length; i += 4) {
                const value = Math.random() * 255;
                buffer[i] = value;
                buffer[i + 1] = value;
                buffer[i + 2] = value;
                buffer[i + 3] = 255;
            }
            offCtx.putImageData(imageData, 0, 0);
            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(off, 0, 0, w, h);
        }

        // Redraw grain only on resize — it is static otherwise.
        let resizeTimer: ReturnType<typeof setTimeout>;
        function onResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(draw, 150);
        }

        draw();
        window.addEventListener('resize', onResize);
        return () => {
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <>
            <div className="site-bg" aria-hidden="true">
                <div className="bg-base" />
                <div className="glow" />
                <div className="glow-secondary" />
                <div className="horizon" />
                <canvas id="noiseCanvas" ref={canvasRef} />
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
