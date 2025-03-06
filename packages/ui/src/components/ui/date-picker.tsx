"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { pl } from "date-fns/locale";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";
import { Calendar } from "@repo/ui/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  withIcon?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Wybierz datę",
  className,
  withIcon = true,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            className,
            !value && "text-muted-foreground",
          )}
          variant="outline"
        >
          {withIcon && <CalendarIcon className="mr-2 h-4 w-4" />}
          {value ? (
            format(value, "PPP", { locale: pl })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          initialFocus
          locale={pl}
          mode="single"
          onSelect={onChange}
          selected={value}
        />
      </PopoverContent>
    </Popover>
  );
}
