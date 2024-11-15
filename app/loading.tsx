// app/loading.tsx

export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    );
  }
  