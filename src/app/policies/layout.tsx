import Header from "../containers/Header";
import Footer from "../containers/Footer";

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {children}
      </main>
      <Footer />
    </>
  );
}
