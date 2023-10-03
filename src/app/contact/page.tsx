import { SiGithub, SiInstagram, SiTistory } from "react-icons/si";
import ContactForm from "@/components/ContactForm";

const LINKS = [
  { icon: <SiGithub />, url: "https://github.com/whoyoung90" },
  { icon: <SiInstagram />, url: "https://www.instagram.com/whoyoung90" },
  { icon: <SiTistory />, url: "https://whoyoung90.tistory.com" },
];

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-4">Contact Me</h2>
      <p>whoyoung90@naver.com</p>
      <ul className="flex gap-6 my-6">
        {LINKS.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="text-5xl hover:text-yellow-400"
          >
            {link.icon}
          </a>
        ))}
      </ul>
      <h2 className="text-3xl font-bold my-8">Or Send me an Email</h2>
      <ContactForm />
    </section>
  );
}
