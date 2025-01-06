import PostsGrid from "./PostsGrid";
import { getFeaturedPosts } from "@/API/posts";

export default async function FeaturedPost() {
  // 프로미스 객체를 반환하는 함수를 호출할 때 await 키워드를 사용하여 비동기 처리
  const posts = await getFeaturedPosts();
  return (
    <section className="my-4">
      <h2 className="text-2xl font-bold my-2">Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
