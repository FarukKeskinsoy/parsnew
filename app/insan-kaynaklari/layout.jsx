import FormContextProvider from "@/lib/contexts/FormContext";
import PageContextProvider from "@/lib/contexts/PageContext";

export default function Layout({children}){
    return <PageContextProvider><FormContextProvider>{children}</FormContextProvider></PageContextProvider>
}