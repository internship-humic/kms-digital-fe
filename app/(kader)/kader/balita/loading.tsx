export default function LoadingDataBalita() {
  return (
    <div className="flex-1 bg-background flex flex-col relative overflow-y-auto">
      <div className="flex items-center justify-center px-6 pt-10 pb-5 bg-background sticky top-0 z-30 border-b border-border-input/10">
        <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-md"></div>
      </div>

      <div className="flex flex-col flex-1 px-6 pb-32 pt-5 gap-4">
        {/* Search Bar Skeleton */}
        <div className="w-full h-[52px] bg-gray-200 animate-pulse rounded-xl mb-1"></div>

        {/* Filter Chips Skeleton */}
        <div className="flex gap-2.5 pb-2">
          <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-full"></div>
        </div>

        {/* Cards Skeleton */}
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-[20px] border border-border-input/30 p-5 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[60px] rounded-full bg-gray-200 animate-pulse"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-5 w-32 bg-gray-200 animate-pulse rounded-md"></div>
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-md"></div>
                </div>
              </div>
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
            <hr className="border-border-input/20 w-full" />
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
