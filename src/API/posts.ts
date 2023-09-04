import path from "path";
import { readFile } from "fs/promises";

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
};
export type PostData = Post & { content: string };

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse) // ((data) => JSON.parse(data)) 전달 및 호출 인자가 동일하면 생략가능
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
}

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

  const metaData = await getAllPosts() //
    .then((post) => post.find((el) => el.path === fileName));
  if (!metaData)
    throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);

  return { ...metaData, content };
}
