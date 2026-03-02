import React from 'react';

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterProps {
    companyName: string;
    description?: string;
    columns: FooterColumn[];
    bottomText?: string;
}

export const Footer: React.FC<FooterProps> = ({ companyName, description, columns = [], bottomText }) => {
    return (
        <footer style={{
            background: 'var(--background)',
            color: 'var(--foreground)',
            padding: '64px 20px 24px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                gap: '48px',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}>
                <div style={{ flex: '1 1 300px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--primary)' }}>
                        {companyName}
                    </h3>
                    {description && (
                        <p style={{ color: 'var(--secondary)', lineHeight: 1.6, maxWidth: '300px' }}>
                            {description}
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', flex: '2 1 auto', justifyContent: 'flex-end' }}>
                    {columns.map((col, idx) => (
                        <div key={idx} style={{ minWidth: '150px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 16px 0', color: 'var(--foreground)' }}>
                                {col.title}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {col.links.map((link, lidx) => (
                                    <li key={lidx}>
                                        <a href={link.href} style={{ color: 'var(--secondary)', textDecoration: 'none', fontSize: '14px', cursor: 'pointer' }} onClick={(e) => e.preventDefault()}>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                maxWidth: '1200px',
                margin: '48px auto 0 auto',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
                color: 'var(--secondary)',
                fontSize: '14px'
            }}>
                {bottomText || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}
            </div>
        </footer>
    );
};
