import Image from "next/image";
import { getPostData } from "@/API/posts";
import PostContent from "@/components/PostContent";
import AdjacentPostCard from "@/components/AdjacentPostCard";

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
