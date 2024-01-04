import Footer from "../components/Footer";
import Announcemenet from "../components/announcemenet";
import NavbarSimple from "../components/navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col ">
            <div className="w-full ">
                <Announcemenet />
                <NavbarSimple />
            </div>

            <div className="flex h-screen flex-col">{children}

                <div className="w-full " >

                    <Footer />
                </div>
            </div>
        </div>
    );
}