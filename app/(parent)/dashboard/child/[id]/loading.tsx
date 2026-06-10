export default function LoadingChildDetail() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="flex items-center px-6 pt-10 pb-5 bg-background sticky top-0 z-20 relative">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 animate-pulse -ml-2 absolute left-6"></div>
        <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-md mx-auto"></div>
      </div>

      <div className="flex-1 px-6 pb-32 pt-2 flex flex-col items-center gap-5 overflow-y-auto">
        {/* Info Card Skeleton */}
        <div className="w-full min-h-[98px] bg-white rounded-[12px] border border-border-input/40 p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex justify-between items-center w-full">
              <div className="h-5 w-32 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
            <div className="h-4 w-40 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        </div>

        {/* Growth Chart Skeleton */}
        <div className="w-full min-h-[511px] bg-white rounded-[12px] border border-border-input/40 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <div className="h-5 w-32 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="h-4 w-20 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
          <div className="flex gap-2 mb-6">
            <div className="flex-1 h-9 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex-1 h-9 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex-1 h-9 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          <div className="flex-1 bg-gray-100 animate-pulse rounded-xl mb-6"></div>
          <div className="flex gap-4 h-24">
            <div className="flex-1 bg-gray-200 animate-pulse rounded-xl"></div>
            <div className="flex-1 bg-gray-200 animate-pulse rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
