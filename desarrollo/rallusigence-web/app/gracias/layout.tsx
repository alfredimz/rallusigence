import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Solicitud enviada — Rallusigence',
  description: 'Tu solicitud de auditoría gratis ha sido recibida. Te contactamos en menos de 24 horas.',
  robots: { index: false, follow: false }, // No indexar página de confirmación
};

export default function GraciasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}