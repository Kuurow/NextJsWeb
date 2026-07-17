import HeroSection from './HeroSection';
import ContentSection from './ContentSection';
import Footer from './Footer';

const SECTIONS = [
    {
        index: '01 — The Space',
        title: 'A sanctuary designed for the present',
        body: 'Every surface, every silence, every breath of light has been considered. The space does not ask you to arrive — it asks you to slow, to settle, to let the present become enough.',
        linkText: 'Discover the space',
        linkHref: '#',
    },
    {
        index: '02 — The Practice',
        title: 'Stillness as a form of movement',
        body: 'This is not absence. It is a refined attentiveness — a discipline of noticing. The practice begins where the noise ends, in the interval between one thought and the next.',
        linkText: 'Explore the practice',
        linkHref: '#',
    },
];

export default function HomePage() {
    return (
        <>
            <HeroSection />

            {SECTIONS.map(s => (
                <ContentSection key={s.index} {...s} />
            ))}

            <Footer />
        </>
    );
}
