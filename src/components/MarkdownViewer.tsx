import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownViewer({ content }: { content: string }) {
  // tailwind 사용시 적용되는 css reset을 "prose"옵션으로 막을 수 있다. (기본 스타일링 적용)
  return (
    <ReactMarkdown className="prose lg:prose-xl" remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}
