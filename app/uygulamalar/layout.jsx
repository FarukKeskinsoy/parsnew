import ApplicationProvider from "@/lib/contexts/ApplicationContext";
import FormContextProvider from "@/lib/contexts/FormContext";

export default function Layout({children}){
    return <ApplicationProvider><FormContextProvider>{children}</FormContextProvider></ApplicationProvider>
}