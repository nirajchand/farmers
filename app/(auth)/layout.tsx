import Navbar from "../_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="h-screen">
            <Navbar/>
            <main >{children}</main>
        </section>
    );
}