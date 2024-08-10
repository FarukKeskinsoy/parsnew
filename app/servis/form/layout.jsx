import FormContextProvider from "@/lib/contexts/FormContext";

export default function Layout({children}){
    return <FormContextProvider>{children}</FormContextProvider>
}