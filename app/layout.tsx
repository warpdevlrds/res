import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Trainer PWA',
  description: 'Aplicativo para personal trainer gerenciar alunos e para alunos acompanharem treinos',
  manifest: '/manifest.json',
  themeColor: '#0ea5e9',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
