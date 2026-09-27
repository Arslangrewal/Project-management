import KPIGrid from "@/components/dashboard/KPIGrid";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h3
        className="
        text-xl
        font-bold
        "
      >
        Dashboard Overview
      </h3>

      <KPIGrid />
    </div>  
  );
}