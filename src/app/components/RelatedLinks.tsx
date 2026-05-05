import Link from "next/link";

type LinkItem = {
    title: string;
    href: string;
};

type RelatedLinksProps = {
    title: string;
    links: LinkItem[];
};

export default function RelatedLinks({ title, links }: RelatedLinksProps) {
    if (!links.length) return null;

    return (
        <section
            aria-labelledby="related-links-title"
            style={{
                marginTop: "3rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                maxWidth: "680px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "0 1rem",
            }}
        >
            <h2
                id="related-links-title"
                style={{
                    fontSize: "1.125rem",
                    marginBottom: "0.75rem",
                    fontWeight: 600,
                    color: "#0f172a",
                }}
            >
                {title}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
                {links.map((link) => (
                    <li key={link.href} style={{ marginBottom: "0.75rem" }}>
                        <Link
                            href={link.href}
                            style={{
                                color: "#0f172a",
                                textDecoration: "underline",
                                textDecorationColor: "rgba(15, 23, 42, 0.5)",
                                fontWeight: 500,
                            }}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
