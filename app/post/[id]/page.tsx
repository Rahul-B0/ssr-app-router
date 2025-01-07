"use client";
import { fetchPostById } from "@/utils/fetcher";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  console.log("id::: ", id);
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPost(id as string);
  }, []);

  const getPost = async (item: string) => {
    try {
      setLoading(true);
      const fetchedPost = await fetchPostById(item);
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
      {post && (
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 mt-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 "
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
