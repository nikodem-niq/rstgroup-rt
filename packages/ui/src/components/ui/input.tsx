import * as React from "react";
import { cn } from "@repo/ui/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  helperText?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, helperText, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          type={type}
          {...props}
        />
        {helperText ? (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
