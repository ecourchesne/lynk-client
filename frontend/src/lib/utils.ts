import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateActivationKey(type: "personal" | "commercial", id: number): string {
  const prefix = type === "personal" ? "1" : "2";
  const paddedId = id.toString().padStart(11, "0"); 
  return `${prefix}${paddedId}`;
}