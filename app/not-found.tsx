import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center px-5">
      <div className="h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-300">
        404
      </div>
      <h1 className="mt-6 text-xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-2 text-sm text-gray-400">
        This page doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Go home
      </Link>
    </div>
  );
}
