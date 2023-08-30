import PostsGrid from "./PostsGrid";
import { getFeaturedPosts } from "@/API/posts";

export default async function FeaturedPost() {
  const posts = await getFeaturedPosts();
  return (
    <section className="my-4">
      <h2 className="text-2xl font-bold my-2">Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
