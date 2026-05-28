import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Términos y condiciones — Rallusigence',
  description: 'Términos de servicio y condiciones de contratación de Rallusigence.',
  robots: { index: true, follow: false },
};

export default function TerminosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}