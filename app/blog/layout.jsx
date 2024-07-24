import BlogContextProvider from "@/lib/contexts/BlogsContext";

export default function Layout({children}){
    return <BlogContextProvider>{children}</BlogContextProvider>
}