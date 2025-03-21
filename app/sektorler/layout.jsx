import SectorContextProvider from "@/lib/contexts/SectorsContext";

export default function Layout({children}){
    return <SectorContextProvider>{children}</SectorContextProvider>
}