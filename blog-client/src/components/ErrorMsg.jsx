export default function ErrorMsg({ message }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded">
      <p>Error: {message}</p>
    </div>
  );
}