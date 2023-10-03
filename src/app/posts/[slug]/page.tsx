import Image from "next/image";
import { getFeaturedPosts, getPostData } from "@/API/posts";
import PostContent from "@/components/PostContent";
import AdjacentPostCard from "@/components/AdjacentPostCard";

// dynamic metaData
export async function generateMetadata({ params: { slug } }: Props) {
  const { title, description } = await getPostData(slug);
  return {
    title,
    description,
  };
}
type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  const { path, title, prev, next } = post;
  return (
    <article className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4">
      <Image
        className="w-full h-1/5 max-h-[500px]"
        src={`/images/posts/${path}.png`}
        alt={title}
        width={760}
        height={420}
      />
      <PostContent post={post} />
      <section className="flex shadow-md">
        {/* @ts-expect-error Server Component */}
        {prev && <AdjacentPostCard post={prev} type="prev" />}
        {/* @ts-expect-error Server Component */}
        {next && <AdjacentPostCard post={next} type="next" />}
      </section>
    </article>
  );
}

// 동적 라우팅 페이지에서 "특정" 페이지를 미리 만들어 두고 싶다면(SSG)
export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
