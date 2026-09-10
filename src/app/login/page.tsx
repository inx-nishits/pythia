import Header from "../containers/Header";
import Footer from "../containers/Footer";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-12 px-4 sm:px-6 flex justify-center">
        <LoginClient />
      </main>
      <Footer />
    </>
  );
}
