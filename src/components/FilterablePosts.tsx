"use client";
import { useState } from "react";
import { Post } from "@/API/posts";
import PostsGrid from "./PostsGrid";
import Categories from "./Categories";

type Props = {
  posts: Post[];
  categories: string[];
};
const ALL_POSTS = "All Posts";

export default function FilterablePosts({ posts, categories }: Props) {
  const [selected, setSelected] = useState(ALL_POSTS); // 상수 변수화
  const filtered =
    selected === ALL_POSTS
      ? posts
      : posts.filter((post) => post.category === selected);
  return (
    <section className="flex m-4">
      <PostsGrid posts={filtered} />
      <Categories
        categories={[ALL_POSTS, ...categories]}
        selected={selected}
        onClick={setSelected}
      />
    </section>
  );
}

/**
 * @description 전달 및 호출 인자가 동일하면 생략가능
 * onClick={(selected) => setSelected(selected)}
 * onClick={setSelected}
 */
