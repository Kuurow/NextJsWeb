import { useState, useEffect } from 'react';

const NAV_LINKS = [
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Nav() {
    const [open, setOpen] = useState(false);

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

    return (
        <>
            <nav className="ns-nav">
                <div className="ns-logo">Kuu &middot; rrow</div>
                <ul className="ns-nav-links">
                    {NAV_LINKS.map(l => (
                        <li key={l.label}>
                            <a href={l.href}>{l.label}</a>
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
                        <div className="ns-mob-index">Menu</div>
                        <button className="ns-mob-close" onClick={close} aria-label="Close menu">
                            <span />
                            <span />
                        </button>
                    </div>
                    <nav className="ns-mob-links">
                        {NAV_LINKS.map((l, i) => (
                            <a
                                key={l.label}
                                href={l.href}
                                className="ns-mob-link"
                                style={{ '--i': i } as React.CSSProperties}
                                onClick={close}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>
                    <div className="ns-mob-footer">
                        <span>Kuu &middot; rrow</span>
                        <span>2026</span>
                    </div>
                </div>
            </div>
        </>
    );
}
