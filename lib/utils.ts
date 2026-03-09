import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/*
  cn() — the standard Shadcn class merging utility.
  Combines clsx (conditional classes) with tailwind-merge
  (deduplicates conflicting Tailwind classes correctly).

  Usage:
    cn('px-4 py-2', isActive && 'bg-primary', className)
*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
