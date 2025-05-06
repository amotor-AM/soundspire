import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#060e12] to-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-8 text-2xl">Page Not Found</h2>
        <p className="mb-8 text-lg text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-[#8C39E0] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-[#7B2CBF]"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 