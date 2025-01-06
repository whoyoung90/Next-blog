import path from "path";
import { readFile } from "fs/promises";
import { cache } from "react";

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
};
export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};

// 성능 최적화 Caching => 페이지 로딩 속도 개선
export const getAllPosts = cache(async () => {
  console.log("getAllPosts");
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse) // ((data) => JSON.parse(data)) 전달 인자와 호출 인자가 동일하면 생략가능
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
});

// export async function getAllPosts(): Promise<Post[]> {
//   console.log("getAllPosts");
//   const filePath = path.join(process.cwd(), "data", "posts.json");
//   return readFile(filePath, "utf-8")
//     .then<Post[]>(JSON.parse)
//     .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
// }

// featured: true인 포스트만 필터링
export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => !post.featured));
}

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data", "posts", `${fileName}.md`);
  const content = await readFile(filePath, "utf-8");

  const posts = await getAllPosts();
  const post = posts.find((el) => el.path === fileName);

  const index = posts.indexOf(post as Post);
  const next = index > 0 ? posts[index - 1] : null; // posts는 날짜별 정렬이므로 index 0이 제일 최신순
  const prev = index < posts.length - 1 ? posts[index + 1] : null;
  if (!post) throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);

  return { ...post, content, prev, next };
}
