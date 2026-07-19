import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

const KEY = 'kuurow:seen-intro';
const MIN_DURATION = 1200; // ms — bar fill time
const FADE_DURATION = 500; // ms — must match .preloader transition

export default function Preloader() {
    const [mounted, setMounted] = useState(true);
    const [leaving, setLeaving] = useState(false);
    const [progress, setProgress] = useState(0);
    const startedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        // Already shown earlier this session → skip entirely.
        if (sessionStorage.getItem(KEY)) {
            setMounted(false);
            return;
        }

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.body.style.overflow = 'hidden';

        let raf = 0;
        const start = performance.now();

        // Real-load guards so the bar never completes before the page is ready.
        let loaded = document.readyState === 'complete';
        const onLoad = () => { loaded = true; };
        if (!loaded) window.addEventListener('load', onLoad, { once: true });

        let fontsReady = !('fonts' in document);
        if (!fontsReady) document.fonts.ready.then(() => { fontsReady = true; });

        function finish() {
            sessionStorage.setItem(KEY, '1');
            setLeaving(true);
            window.setTimeout(() => {
                document.body.style.overflow = '';
                setMounted(false);
            }, reduce ? 0 : FADE_DURATION);
        }

        if (reduce) {
            setProgress(100);
            finish();
            return () => window.removeEventListener('load', onLoad);
        }

        function tick(now: number) {
            const timePct = Math.min((now - start) / MIN_DURATION, 1);
            setProgress(Math.round(timePct * 100));
            if (timePct >= 1 && loaded && fontsReady) {
                finish();
                return;
            }
            raf = requestAnimationFrame(tick);
        }
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('load', onLoad);
            document.body.style.overflow = '';
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className={`preloader${leaving ? ' leaving' : ''}`} aria-hidden="true">
            <div className="preloader-inner">
                <div className="preloader-logo">
                    <Logo />
                </div>
                <div className="preloader-bar">
                    <span className="preloader-bar-fill" style={{ width: `${progress}%` }} />
                </div>
                <span className="preloader-count">{String(progress).padStart(3, '0')}</span>
            </div>
        </div>
    );
}
