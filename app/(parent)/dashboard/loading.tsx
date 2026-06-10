export default function LoadingDashboardParent() {
  return (
    <div className="flex-1 bg-background flex flex-col relative overflow-y-auto pb-32">
      <div className="flex items-center justify-between px-6 pt-10 pb-4 sticky top-0 bg-background z-30 border-b border-border-input/10">
        <div className="w-10"></div>
        <div className="h-8 w-28 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
      </div>

      <div className="px-6 mt-6 mb-6 flex flex-col gap-2">
        <div className="h-6 w-40 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-4 w-64 bg-gray-200 animate-pulse rounded-md"></div>
      </div>

      <div className="px-6 flex flex-col gap-5">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="bg-white rounded-[20px] border border-border-input/40 p-5 block"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="w-[60px] h-[60px] rounded-full bg-gray-200 animate-pulse"></div>
              <div className="w-6 h-6 rounded-md bg-gray-200 animate-pulse"></div>
            </div>
            <div className="h-5 w-36 bg-gray-200 animate-pulse rounded-md mb-2"></div>
            <div className="h-4 w-28 bg-gray-200 animate-pulse rounded-md mb-4"></div>
            <div className="flex gap-2.5">
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
