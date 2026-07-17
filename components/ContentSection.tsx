interface ContentSectionProps {
    index: string;
    title: React.ReactNode;
    body: string;
    linkText: string;
    linkHref?: string;
}

export default function ContentSection({
    index, title, body, linkText, linkHref = '#',
}: ContentSectionProps) {
    return (
        <section className="block">
            <div className="block-inner">
                <div className="block-index">{index}</div>
                <h2>{title}</h2>
                <p>{body}</p>
                <a className="block-link" href={linkHref}>{linkText}</a>
            </div>
        </section>
    );
}
