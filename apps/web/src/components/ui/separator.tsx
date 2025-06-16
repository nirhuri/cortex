"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        aria-hidden={decorative}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator };
