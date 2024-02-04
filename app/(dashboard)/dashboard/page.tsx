import { GetFormStats } from "@/app/actions/form";
import { Separator } from "@/components/ui/separator";
import StatsCard from "../_components/StatsCard";
import { Suspense } from "react";
import CreateFormBtn from "../_components/CreateFormBtn";
import FormCardSkeleton from "../_components/FormCardSkeleton";
import FormCards from "../_components/FormCards";

export default function DashboardPage() {
  return (
    <div className="container pt-4">
      {/* CardStatsWrapper */}
      <Suspense fallback={<StatsCard loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <div className="flex md:flex-row flex-col space-y-2 md:items-center items-start md:justify-between pt-10">
        <h2 className="text-4xl font-bold">All Your Forms</h2>
        <CreateFormBtn />
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={[...Array(5)].map((_, i) => (
            <FormCardSkeleton key={i} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCard loading={false} data={stats} />;
}
