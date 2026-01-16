import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";

export default function MainLayout({ children }) {
    return (
        <>
            <div className="hidden md:block">
                <Navbar />
            </div>
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <MobileNav />
        </>
    );
}
