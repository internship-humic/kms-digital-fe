export default function LoadingDetailBalita() {
  return (
    <div className="flex flex-col flex-1 bg-background pb-10">
      <div className="flex items-center px-6 pt-10 pb-5 bg-background sticky top-0 z-30 border-b border-border-input/10">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse absolute left-6"></div>
        <div className="h-7 w-40 bg-gray-200 animate-pulse rounded-md mx-auto"></div>
      </div>

      <div className="px-6 flex flex-col gap-6 pt-6">
        {/* Info Card Skeleton */}
        <div className="bg-white p-4 rounded-[20px] border border-border-input/40 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-5 w-40 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        </div>

        {/* Metrics Grid Skeleton */}
        <div className="bg-white p-5 rounded-[20px] border border-border-input/40 shadow-sm flex flex-col gap-5">
          <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[104px] bg-gray-200 animate-pulse rounded-[16px]"></div>
            <div className="h-[104px] bg-gray-200 animate-pulse rounded-[16px]"></div>
            <div className="col-span-2 h-[104px] bg-gray-200 animate-pulse rounded-[16px]"></div>
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="bg-white p-5 rounded-[20px] border border-border-input/40 shadow-sm h-[400px] flex flex-col gap-4">
          <div className="h-6 w-48 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="flex-1 bg-gray-100 animate-pulse rounded-[16px]"></div>
        </div>
      </div>
    </div>
  );
}
