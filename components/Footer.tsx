const FOOTER_LINKS = [
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Footer() {
    return (
        <footer className="ns-footer">
            <div className="ns-footer-inner">
                <div className="ns-footer-top">
                    <span className="ns-footer-logo">Kuurow</span>
                    <nav className="ns-footer-nav">
                        {FOOTER_LINKS.map(l => (
                            <a key={l.label} href={l.href}>{l.label}</a>
                        ))}
                    </nav>
                </div>
                <div className="ns-footer-rule" />
                <div className="ns-footer-bottom">
                    <span className="ns-footer-copy">&copy; 2026 Kuurow. All rights reserved.</span>
                    <span className="ns-footer-tag">48.07°N &nbsp; 0.77°W</span>
                </div>
            </div>
        </footer>
    );
}
