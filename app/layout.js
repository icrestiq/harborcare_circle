import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'HarborCare Circle — Coordinated Care for Aging Parents, Without the Chaos',
  description:
    'Find practical guidance, checklists, and tools for caring for aging loved ones — from the first signs they need help through major family transitions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-warm-cream text-soft-navy font-body">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
