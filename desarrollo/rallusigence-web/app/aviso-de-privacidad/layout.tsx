import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Aviso de privacidad — Rallusigence',
  description: 'Conoce cómo protegemos y tratamos tus datos personales en Rallusigence.',
  robots: { index: true, follow: false },
};

export default function AvisoPrivacidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}