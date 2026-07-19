import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_LINKS = [
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Nav() {
    const router = useRouter();
    // The floating/reveal behaviour only makes sense on the home page, which has a
    // full-height hero. Every other page keeps the nav in its materialised state.
    const isHome = router.pathname === '/';

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(!isHome);

    function toggle() {
        setOpen(prev => !prev);
    }

    function close() {
        setOpen(false);
    }

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    // On the home page, reveal the brand + shadow only once scrolled past most of
    // the hero. Elsewhere the nav stays materialised.
    useEffect(() => {
        if (!isHome) {
            setScrolled(true);
            return;
        }
        function onScroll() {
            setScrolled(window.scrollY > window.innerHeight * 0.8);
        }
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome]);

    return (
        <>
            <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
                <Link href="/" className="brand">Kuurow</Link>
                <ul>
                    {NAV_LINKS.map(l => (
                        <li key={l.label}>
                            {l.href.startsWith('/') ? (
                                <Link href={l.href} className="nav-link">{l.label}</Link>
                            ) : (
                                <a href={l.href} className="nav-link">{l.label}</a>
                            )}
                        </li>
                    ))}
                </ul>
                <button
                    className={`ns-burger${open ? ' open' : ''}`}
                    onClick={toggle}
                    aria-label="Open menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </nav>

            <div className={`ns-mob-overlay${open ? ' open' : ''}`}>
                <div className="ns-mob-inner">
                    <div className="ns-mob-top-bar">
                        <span className="ns-mob-brand">Kuurow</span>
                        <button className="ns-mob-close" onClick={close} aria-label="Close menu">
                            <span />
                            <span />
                        </button>
                    </div>
                    <span className="ns-mob-index">Menu &mdash; Navigation</span>
                    <nav className="ns-mob-links">
                        {NAV_LINKS.map((l, i) => {
                            const style = { '--i': i } as React.CSSProperties;
                            const inner = (
                                <>
                                    <span className="ns-mob-link-num">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="ns-mob-link-label">{l.label}</span>
                                </>
                            );
                            return l.href.startsWith('/') ? (
                                <Link
                                    key={l.label}
                                    href={l.href}
                                    className="ns-mob-link"
                                    style={style}
                                    onClick={close}
                                >
                                    {inner}
                                </Link>
                            ) : (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    className="ns-mob-link"
                                    style={style}
                                    onClick={close}
                                >
                                    {inner}
                                </a>
                            );
                        })}
                    </nav>
                    <div className="ns-mob-footer">
                        <span>&copy; 2026 Kuurow</span>
                        <span>&mdash; // &mdash;</span>
                    </div>
                </div>
            </div>
        </>
    );
}
