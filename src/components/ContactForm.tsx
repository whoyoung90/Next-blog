"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Banner, { BannerData } from "./Banner";
import { sendContactEmail } from "@/API/contact";

type Form = {
  from: string;
  subject: string;
  message: string;
};
const DEFAULT_DATA = {
  from: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<Form>(DEFAULT_DATA);
  const [banner, setBanner] = useState<BannerData | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // setForm({ ...form, [name]: value });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지가 다시 로딩되지 않도록
    try {
      const { message } = await sendContactEmail(form);
      setBanner({ message, state: "success" });
      setForm(DEFAULT_DATA);
    } catch (error) {
      const errMsg = `${(error as Error).message}` || "메일 전송 실패 😂";
      setBanner({
        message: errMsg,
        state: "error",
      });
    } finally {
      setTimeout(() => {
        setBanner(null);
      }, 3000);
    }
  };
  return (
    <section className="max-w-md w-full">
      {banner && <Banner banner={banner} />}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md flex flex-col gap-2 my-4 p-4 bg-slate-700 rounded-xl text-white"
      >
        <label htmlFor="from" className="font-semibold">
          Your Email
        </label>
        <input
          type="email"
          id="from"
          name="from"
          required
          autoFocus
          value={form.from}
          onChange={onChange}
          className="text-black"
        />
        <label htmlFor="subject" className="font-semibold">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={onChange}
          className="text-black"
        />
        <label htmlFor="message" className="font-semibold">
          Message
        </label>
        <textarea
          rows={10}
          id="message"
          name="message"
          required
          value={form.message}
          onChange={onChange}
          className="text-black"
        />
        <button className="bg-yellow-300 text-black font-bold hover:bg-yellow-400">
          submit
        </button>
      </form>
    </section>
  );
}
