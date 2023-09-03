import { getAllPosts } from "@/API/posts";
import FilterablePosts from "@/components/FilterablePosts";

export default async function PostsPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((post) => post.category))];
  // ['my story', 'frontend', 'backend', 'javascript']

  return <FilterablePosts posts={posts} categories={categories} />;
}

/**
 * post.category들을 그대로 가져오면 중복 데이터 존재
 *
 * 그 중복을 Set으로 변환 -> Set을 다시 배열로 변환
 * Set은 중복이 허용되지 않으므로, 고유한 카테고리들만 출력 가능
 */
