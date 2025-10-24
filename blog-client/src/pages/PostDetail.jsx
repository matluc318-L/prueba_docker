import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../api/blogApi";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";

export default function PostDetail() {
  const { id } = useParams();

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMsg message={error.message} />;

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-500 underline">
        ← Volver
      </Link>
      <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
      <p className="mt-2">{post.body}</p>
    </div>
  );
}
