/** Temporary geometric K monogram — placeholder until the real logo lands.
 *  Size is controlled by the parent via CSS (e.g. .hero-logo svg / .preloader-logo svg). */
export default function Logo() {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
    );
}
