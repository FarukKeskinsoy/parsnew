import { getAllBlogs } from "@/lib/firebase/blog/read_server";

export default async function BlogPageListView() {
    const blogs = await getAllBlogs();

    if(!blogs){
        return(
            <div>
                <h3>Blog bulunmamaktadır</h3>
            </div>
        )
    }
    return(
        <section>
            {blogs?.map((blog,bdx)=>{
                return(
                    <div key={bdx}>
                        <h1>{blog?.title}</h1>
                    </div>
                )
            })}
        </section>
    )
}