import {
  Users,
  FolderKanban,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import StatisticCard from "./StatisticCard";

export default function KPIGrid() {
  const stats = [
    {
      title: "Total Users",
      value: "12,540",
      icon: Users,
      trend: "up",
      percentage: 12,
    },
    {
      title: "Active Users",
      value: "8,210",
      icon: Users,
      trend: "up",
      percentage: 6,
    },
    {
      title: "Total Projects",
      value: "352",
      icon: FolderKanban,
      trend: "up",
      percentage: 18,
    },
    {
      title: "Revenue",
      value: "$84,500",
      icon: DollarSign,
      trend: "up",
      percentage: 23,
    },
    {
      title: "Growth",
      value: "17%",
      icon: TrendingUp,
      trend: "up",
      percentage: 4,
    },
    {
      title: "Monthly Signups",
      value: "1,542",
      icon: Users,
      trend: "up",
      percentage: 9,
    },
    {
      title: "Completed Tasks",
      value: "4,352",
      icon: FolderKanban,
      trend: "up",
      percentage: 15,
    },
    {
      title: "Conversion Rate",
      value: "7.8%",
      icon: TrendingUp,
      trend: "down",
      percentage: 3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <StatisticCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  );
}