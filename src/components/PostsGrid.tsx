import { Post } from "@/API/posts";

type Props = {
  posts: Post[];
};

// export default function PostsGrid(props: Props) {
export default function PostsGrid({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.path}>{post.title}</li>
      ))}
    </ul>
  );
}
