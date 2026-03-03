"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    setLoading(true);
    window.location.reload(); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-8 shadow-md max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={handleRetry}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          Retry
        </button>
      </div>
    </div>
  );
}
