import React from 'react'
import Link from 'next/link'
import { NextPageContext } from 'next'

interface ErrorProps {
  statusCode?: number
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#060e12] to-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-6xl font-bold">{statusCode || 'Error'}</h1>
        <h2 className="mb-8 text-2xl">
          {statusCode === 404
            ? 'Page Not Found'
            : 'Something went wrong'}
        </h2>
        <p className="mb-8 text-lg text-gray-400">
          {statusCode === 404
            ? "The page you're looking for doesn't exist or has been moved."
            : "We're sorry, but something went wrong. Please try again later."}
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

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error 