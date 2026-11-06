"use client";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import * as React from "react";
export const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(function Label({ className, ...props }, ref) { return <LabelPrimitive.Root ref={ref} className={cn("mb-1.5 block text-sm font-semibold text-[#354b3f]", className)} {...props} />; });
