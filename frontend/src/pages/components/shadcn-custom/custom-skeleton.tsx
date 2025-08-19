import { Skeleton } from "@/components/ui/skeleton";
import type { CustomSkeletonProps } from "../utils/common-interfaces";

export function CustomSkeleton({ type }: CustomSkeletonProps) {
  if (type === "home")
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[300px] w-7xl rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[400px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  if (type === "posts")
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[300px] w-4xl rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[400px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
    </div>
  );
}
