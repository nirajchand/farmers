export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)]">
      <div className="w-12 h-12 border-4 border-[var(--info)] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-[var(--foreground)] text-lg font-medium">Loading, please wait...</p>
    </div>
  );
}