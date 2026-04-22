import { useEffect, useRef } from 'react';

interface ContentSectionProps {
    index: string;
    title: React.ReactNode;
    body: string;
    linkText: string;
    linkHref?: string;
    flip?: boolean;
}

export default function ContentSection({
    index, title, body, linkText, linkHref = '#', flip = false,
}: ContentSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('in-view');
                    observer.disconnect();
                }
            },
            { threshold: 0.15 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={`ns-content-section${flip ? ' flip' : ''}`}>
            <div className="ns-sec-text">
                <span className="ns-sec-index">{index}</span>
                <h2 className="ns-sec-title">{title}</h2>
                <p className="ns-sec-body">{body}</p>
                <a className="ns-sec-link" href={linkHref}>{linkText}</a>
            </div>
            <div className="ns-sec-img">
                {/* placeholder — swap for <Image> or real content later */}
                <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <rect width="600" height="800" fill="#2A1A0E" />
                    <path d="M -60 700 Q 300 300 660 600" fill="none" stroke="#B8956A" strokeWidth="0.8" opacity="0.45" />
                    <path d="M -60 740 Q 300 340 660 640" fill="none" stroke="#B8956A" strokeWidth="0.5" opacity="0.30" />
                    <path d="M -60 660 Q 300 260 660 560" fill="none" stroke="#D9C4A8" strokeWidth="0.4" opacity="0.20" />
                    <ellipse cx="380" cy="280" rx="130" ry="160" fill="none" stroke="#7A5C3E" strokeWidth="0.6" opacity="0.40" />
                    <ellipse cx="380" cy="280" rx="80" ry="100" fill="none" stroke="#B8956A" strokeWidth="0.4" opacity="0.25" />
                    <line x1="376" y1="278" x2="384" y2="278" stroke="#D9C4A8" strokeWidth="0.7" opacity="0.55" />
                    <line x1="380" y1="274" x2="380" y2="282" stroke="#D9C4A8" strokeWidth="0.7" opacity="0.55" />
                    <line x1="0" y1="520" x2="600" y2="520" stroke="#7A5C3E" strokeWidth="0.4" strokeDasharray="3 8" opacity="0.30" />
                    <path d="M 20 20 L 20 40 M 20 20 L 40 20" fill="none" stroke="#B8956A" strokeWidth="0.7" opacity="0.40" />
                    <path d="M 580 780 L 580 760 M 580 780 L 560 780" fill="none" stroke="#B8956A" strokeWidth="0.7" opacity="0.40" />
                </svg>
            </div>
        </section>
    );
}
