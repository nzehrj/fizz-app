import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6 rounded-lg shadow-md w-1/3 text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested resource</p>
        <Link
          href="/"
          className="inline-block mt-4 ml-2 border rounded px-4 py-2 hover:bg-gray-100"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
