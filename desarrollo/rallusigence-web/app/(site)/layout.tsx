import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollKiwi from "@/components/ui/ScrollKiwi";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollKiwi />
      <Header />
      {children}
      <Footer />
    </>
  );
}
