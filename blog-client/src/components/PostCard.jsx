import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`}>
      <div className="border p-4 rounded shadow hover:shadow-lg transition">
        <h2 className="text-lg font-bold mb-2">{post.title}</h2>
        <p>{post.body.substring(0, 80)}...</p>
      </div>
    </Link>
  );
}
