import * as React from "react";
import { cn } from "@/lib/utils";
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...props }, ref) { return <input ref={ref} className={cn("h-11 w-full rounded-xl border border-[#d8ded7] bg-white px-3.5 text-sm outline-none placeholder:text-[#9ba69d] focus:border-[#56856d] focus:ring-2 focus:ring-[#d7e8dc]", className)} {...props} />; });
