import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("text-center p-6 rounded-2xl glass", className)}>
      <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">{value}</div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
