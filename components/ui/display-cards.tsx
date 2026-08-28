"use client";

import { cn } from "../../lib/utils";
import { Sparkles } from "lucide-react";

export interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-primary" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName = "text-primary",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[20rem] sm:w-[22rem] -skew-y-[6deg] select-none flex-col justify-between rounded-xl border-2 bg-card/80 backdrop-blur-md px-4 py-3 transition-all duration-500 hover:border-primary/50 hover:bg-card [&>*]:flex [&>*]:items-center [&>*]:gap-2 shadow-lg",
        className,
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-primary/10 p-1.5">
          {icon}
        </span>
        <p className={cn("text-base font-semibold", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-sm font-medium text-foreground">
        {description}
      </p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 py-6">
      {cards?.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
