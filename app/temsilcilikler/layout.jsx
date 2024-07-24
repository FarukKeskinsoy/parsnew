import BrandContextProvider from "@/lib/contexts/BrandsContext";

export default function Layout({children}){
    return <BrandContextProvider>{children}</BrandContextProvider>
}