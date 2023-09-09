"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

export default function MarkdownViewer({ content }: { content: string }) {
  // tailwind 사용시 적용되는 css reset을 "prose"옵션으로 막을 수 있다. (기본 스타일링 적용)
  return (
    <ReactMarkdown
      className="prose lg:prose-xl max-w-none"
      remarkPlugins={[remarkGfm]}
      // component prop을 통해 태그 요소를 커스터마이징
      components={{
        // 코드 문법 highlight
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              {...props}
              style={materialDark}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        // NextJS Image Customizing
        img: (image) => (
          <Image
            className="w-full max-h-60 object-cover"
            src={image.src || ""}
            alt={image.alt || ""}
            width={500}
            height={350}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
