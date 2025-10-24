// src/pages/Posts.jsx
import React, { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPage } from "../api/blogApi";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";
import SearchBar from "../components/SearchBar";
import DarkToggle from "../components/DarkToggle";
import Stats from "../components/Stats";

export default function Posts() {
  const [query, setQuery] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery(
    ["posts_infinite"],
    ({ pageParam = 1 }) => fetchPostsPage({ pageParam, limit: 9 }), // 9 por fila 3x3
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
      retry: 1,
    }
  );

  const allPosts = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((p) => p.data);
  }, [data]);

  // búsqueda local simple
  const filtered = allPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.body.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMsg message={error.message} />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <SearchBar value={query} onChange={setQuery} />
          <button onClick={() => { setQuery(""); refetch(); }} className="px-3 py-1 border rounded">Reset</button>
        </div>

        <div className="flex items-center gap-3">
          <Stats />
          <DarkToggle />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 border rounded"
          >
            {isFetchingNextPage ? "Cargando..." : "Cargar más"}
          </button>
        ) : (
          <p className="text-gray-500">No hay más posts</p>
        )}
      </div>
    </div>
  );
}
