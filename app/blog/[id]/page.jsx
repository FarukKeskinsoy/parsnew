import { getBlog } from "@/lib/firebase/blog/read_server";
import Image from "next/image";
import BlogClientComponent from "./BlogClientComponent";
import BlogsListSideBar from "@/app/components/BlogsListSideBar";
import { getAuthor } from "@/lib/firebase/author/read_server";
import { getCategory } from "@/lib/firebase/category/read_server";

export default async function BlogDetay({ params }) {
  const { id } = params;
  const strArr = id?.split("-");
  const docId = strArr[strArr.length - 1];

  try {
    const data = await getBlog(docId);

    if (!data) {
      return <div>Blog not found</div>;
    }

    return (
      <main className="w-full flex flex-col bg-white py-4 lg:py-12 px-4 lg:px-0 gap-4 lg:gap-8">
        {/* <div className="inner !items-stretch w-full flex-col lg:flex-row">
          <div className="blogContainer flex flex-col gap-4 lg:w-[65%]">
            <CategoryCard categoryId={data?.category} />
            <h1 className="text-black text-lg lg:font-bold lg:text-3xl w-full max-w-[1300px]">
              {data?.title}
            </h1>
            {data?.images?.[0] && (
              <Image
                src={data.images[0]}
                alt={data.title}
                width={800}
                height={400}
                className="w-full object-contain rectangleImg"
                placeholder="blur"
                blurDataURL="/placeholder_image.jpg" // Optional: Path to a low-res placeholder image
              />
            )}
            <div>
              <AuthorCard authorId={data?.userid} />
              <h5 className="text-sm text-gray-500">
                {new Date(data?.createdAt?.seconds * 1000)?.toLocaleDateString()}
              </h5>
            </div>
            <BlogClientComponent content={data?.content} />
          </div>
          <div className="w-full lg:w-[35%]">
            <BlogsListSideBar />
          </div>
        </div> */}
      </main>
    );
  } catch (error) {
    console.error("Error rendering blog details:", error);
    return <div>Error loading blog details</div>;
  }
}

async function AuthorCard({ authorId }) {
  try {
    const author = await getAuthor(authorId);
    return <h4>{author?.uName}</h4>;
  } catch (error) {
    console.error("Error fetching author:", error);
    return <div>Author information not available</div>;
  }
}

async function CategoryCard({ categoryId }) {
  try {
    const category = await getCategory(categoryId);
    return (
      <div className="z-10 text-gray-500 border rounded-full w-max px-4 py-2">
        {category?.title}
      </div>
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return <div>Category information not available</div>;
  }
}
