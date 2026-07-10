import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NemezisAI Agency OS',
  description: 'Premium operational platform demo for staffing agencies'
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
