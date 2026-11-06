import * as React from "react";
import { cn } from "@/lib/utils";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost"; size?: "default" | "sm" };
export function Button({ className, variant = "default", size = "default", ...props }: Props) { return <button className={cn("inline-flex items-center justify-center rounded-xl font-semibold transition disabled:pointer-events-none disabled:opacity-50", size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-5", variant === "default" ? "bg-[#174a3a] text-white hover:bg-[#103b2e]" : variant === "outline" ? "border border-[#d8ded7] bg-white text-[#253b32] hover:bg-[#f4f6f2]" : "text-[#52655a] hover:bg-[#f2f4ef]", className)} {...props} />; }
