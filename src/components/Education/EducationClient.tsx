"use client";

import React from "react"; // Add this line

import { Post } from "../../../lib/graphcms";

interface EducationClientProps {
  posts: Post[];
}

export default function EducationClient({ posts }: EducationClientProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        {posts.map((post) => (
          <div key={post.id} className="rounded-sm bg-white p-4 shadow-lg">
            <a href={post.slug} target="_blank" rel="noopener noreferrer">
              <h2 className="mb-2 text-xl font-semibold text-black">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-2">{post.title}</p>
              <p className="cursor-pointer text-blue-500 underline">
                Read more
              </p>
              <p className="text-gray-500 mt-2 text-sm">
                {/* Date: {formatDate(article.createdAt)} */}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
