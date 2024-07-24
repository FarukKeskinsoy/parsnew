import PageContextProvider from "@/lib/contexts/PageContext";

export default function Layout({children}){
    return <PageContextProvider>{children}</PageContextProvider>
}