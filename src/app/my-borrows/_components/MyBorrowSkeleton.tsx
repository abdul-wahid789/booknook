import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ShelfSkeletonProps {
  rowCount?: number;
}
const MyBorrowSkeleton = ({ rowCount = 4 }: ShelfSkeletonProps) => {
    return (
        <div className="space-y-6">
      {/* Top Stat Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="rounded-xl border border-border/70 bg-card p-5 shadow-2xs"
          >
            <div className="flex items-start gap-3.5">
              {/* Icon Box */}
              <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />

              {/* Text content */}
              <div className="w-full space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border/70 bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3.5">Book / Author</th>
                <th className="px-4 py-3.5">Borrow Date</th>
                <th className="px-4 py-3.5">Return Date</th>
                <th className="px-4 py-3.5">Due Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60 text-xs">
              {Array.from({ length: rowCount }).map((_, index) => (
                <tr key={index} className="transition-colors">
                  {/* Book / Author */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Book Cover Thumbnail */}
                      <Skeleton className="aspect-2/3 h-16 w-11 shrink-0 rounded-xs" />

                      {/* Title & Author */}
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-36 sm:w-48" />
                        <Skeleton className="h-3 w-24 sm:w-32" />
                      </div>
                    </div>
                  </td>

                  {/* Borrow Date */}
                  <td className="px-4 py-4">
                    <Skeleton className="h-3.5 w-24" />
                  </td>

                  {/* Return Date */}
                  <td className="px-4 py-4">
                    <Skeleton className="h-3.5 w-24" />
                  </td>

                  {/* Due Status Pill */}
                  <td className="px-4 py-4">
                    <Skeleton className="h-5 w-24 rounded-sm" />
                  </td>

                  {/* Action Button */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end">
                      <Skeleton className="h-8 w-24 rounded-md" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Status Strip */}
        <div className="flex items-center justify-between border-t border-border/70 bg-card px-6 py-3.5">
          <Skeleton className="h-3.5 w-48" />
        </div>
      </div>
    </div>
    );
};

export default MyBorrowSkeleton;