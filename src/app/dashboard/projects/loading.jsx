import Loader from "@/app/components/ui/Loader"

export default function Loading() {
  return (
    <div className="flex min-h-DataTable[400px] items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}