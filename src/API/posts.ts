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

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse) // ((data) => JSON.parse(data)) 전달 및 호출 인자가 동일하면 생략가능
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
}
