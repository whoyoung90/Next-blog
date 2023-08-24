import { Post } from "@/API/posts";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};

// export default function PostsGrid(props: Props) {
export default function PostsGrid({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.path}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
