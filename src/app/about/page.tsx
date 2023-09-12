import Hero from "@/components/Hero";

const TITLE_CLASS = "text-2xl font-bold text-gray-800 my-2";

export default function AboutPage() {
  return (
    <>
      <Hero />
      <section className="bg-gray-100 shadow-lg p-8 m-8 text-center">
        <h2 className={TITLE_CLASS}>Who Am I?</h2>
        <p>
          좌충우돌 프론트엔드 생존중
          <br />
          사람과 디자인을 담는 웹앱을 만들고 있음
        </p>
        <h2 className={TITLE_CLASS}>Career</h2>
        <p>
          알고랩 (-Now) <br />
        </p>
        <h2 className={TITLE_CLASS}>Skills</h2>
        <p>
          React, Vue, TypeScript
          <br />
          Next, Nuxt, Git
          <br />
          VS Code
        </p>
      </section>
    </>
  );
}
