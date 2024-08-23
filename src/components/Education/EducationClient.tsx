"use client";

import React from "react"; // Add this line

import { Post } from "../../../lib/graphcms";

interface EducationClientProps {
  posts: Post[];
}

export default function EducationClient({ posts }: EducationClientProps) {
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id} className="my-[2.5rem] flex flex-col">
          <h2 className="text-red">{post.title}</h2>
          <div
            className="border"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        </article>
      ))}
    </div>
  );
}
