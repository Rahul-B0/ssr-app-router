"use client";

import { fetchPost } from "../utils/fetcher";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const router = useRouter();
  const [post, setPost] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      setLoading(true);
      const fetchedPost = await fetchPost();
      setPost(fetchedPost);
    } catch (err) {
      setError("Failed to fetch the post.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Blog Post</h2>
      {post &&
        post.map((item, idx) => (
          <div key={idx} className="border p-2 m-2">
            <h2>
              {idx + 1}.{item.title}
            </h2>
            <p>{item.body}</p>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 mt-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 "
              onClick={() => router.push(`/post/${item?.id}`)}
            >
              Show
            </button>
          </div>
        ))}
    </div>
  );
}
