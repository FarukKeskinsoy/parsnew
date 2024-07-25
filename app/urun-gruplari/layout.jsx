import ProductContextProvider from "@/lib/contexts/ProductContext";

export default function Layout({children}){
    return <ProductContextProvider>{children}</ProductContextProvider>
}