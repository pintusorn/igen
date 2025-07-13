export default function TestPerformancePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Performance Test Page</h1>
        <p className="text-gray-600">This is a minimal page to test loading performance</p>
        <div className="mt-4 text-sm text-gray-500">
          Load time should be under 1 second
        </div>
      </div>
    </div>
  )
} 