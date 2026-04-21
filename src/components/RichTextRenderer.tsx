import React from "react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { Link } from "@tanstack/react-router";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://127.0.0.1:1338";

interface RichTextProps {
  content: BlocksContent | string;
}

export default function RichTextRenderer({
  content,
}: {
  content: BlocksContent;
}) {
  if (!content) return null;

  if (typeof content === "string") {
    return (
      <div
        className="prose prose-invert prose-lg max-w-none 
                   prose-headings:text-white prose-p:text-gray-300 
                   prose-a:text-blue-400 prose-img:rounded-2xl 
                   prose-img:border prose-img:border-white/10"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400">
      <BlocksRenderer
        content={content}
        blocks={{
          link: ({ children, url }) => (
            <Link to={url as any} className="underline hover:text-blue-300">
              {children}
            </Link>
          ),
          // Custom image rendering with full Strapi URLs
          image: ({ image }) => (
            <figure className="my-8">
              <img
                src={
                  image.url.startsWith("/")
                    ? `${STRAPI_URL}${image.url}`
                    : image.url
                }
                alt={image.alternativeText || ""}
                className="rounded-2xl border border-white/10 shadow-xl"
              />
              {image.caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-2">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ),
          // Tailwind-styled headings
          heading: ({ children, level }) => {
            const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
            const sizes = {
              1: "text-4xl font-black mb-6",
              2: "text-3xl font-bold mt-12 mb-4",
              3: "text-2xl font-semibold mt-8 mb-3",
              4: "text-xl font-medium mt-6 mb-2",
              5: "text-lg font-medium mt-4",
              6: "text-base font-medium mt-2",
            };
            return <Tag className={sizes[level]}>{children}</Tag>;
          },
        }}
      />
    </div>
  );
}
