
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col ">


            <div className="flex h-screen flex-col">{children}</div>
        </div>
    );
}