import Link from "next/link";
import React from "react";

type PostCardProps = {
  id: number;
  title: string;
  body: string;
};

export const PostCard = ({ id, title, body }: PostCardProps) => (
  <div className="post-card" style={{ border: "1px solid #ddd", marginBottom: "16px", padding: "16px", background: "#fff" }}>
    <h3>{title}</h3>
    <p>{body.substring(0, 100)}...</p>
    <Link href={`/post/${id}`} style={{ color: "#007bff" }}>
      Read More
    </Link>
  </div>
);