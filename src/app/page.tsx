import Hero from "@/components/Hero";
import FeaturedPost from "@/components/FeaturedPosts";
import CarouselPosts from "@/components/CarouselPosts";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* @ts-expect-error Server Component */}
      <FeaturedPost />
      {/* @ts-expect-error Server Component */}
      <CarouselPosts />
    </>
  );
}
