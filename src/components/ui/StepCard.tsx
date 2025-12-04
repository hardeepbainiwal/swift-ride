import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  className?: string;
}

export function StepCard({ step, title, description, className }: StepCardProps) {
  return (
    <div className={cn("relative flex gap-4", className)}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-lg shadow-primary/30">
          {step}
        </div>
        <div className="flex-1 w-px bg-gradient-to-b from-primary/50 to-transparent mt-2" />
      </div>
      <div className="pb-8">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
