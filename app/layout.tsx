import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI UI Architect',
    description: 'Production-grade Multi-Agent UI Generation System',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
