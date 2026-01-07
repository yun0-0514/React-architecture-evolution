import { useIntersectionObserver } from "../hooks/useIntersectionObserve";
import { InfiniteScrollSentinelProps } from "../types/components.types";
import { ProductSkeleton } from "./ProductSkeleton";

export const InfiniteScrollSentinel = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollSentinelProps) => {
  const ref = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "100px",
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });
  if (!hasNextPage) return null;
  return (
    <div ref={ref} className="col-span-2 flex justify py-6 min-h-[50px]">
      {isFetchingNextPage && <ProductSkeleton />}
    </div>
  );
};
