import Hero from "@/components/Hero";
import FeaturedPost from "@/components/FeaturedPosts";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* @ts-expect-error Server Component */}
      <FeaturedPost />
    </>
  );
}
