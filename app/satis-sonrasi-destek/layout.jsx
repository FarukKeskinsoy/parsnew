import PageContextProvider from "@/lib/contexts/PageContext";
import SectorContextProvider from "@/lib/contexts/SectorsContext";

export default function Layout({children}){
    return <PageContextProvider>{children}</PageContextProvider>
}