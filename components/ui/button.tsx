import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-xs font-bold font-mono transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-orange-500 focus-visible:ring-orange-500/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white hover:bg-orange-500/90 border border-orange-500",
        destructive: "bg-red-500 text-white hover:bg-red-500/90 focus-visible:ring-red-500/20 border border-red-500",
        outline: "border border-neutral-700 bg-transparent text-neutral-400 hover:bg-neutral-800 hover:text-white",
        secondary: "bg-neutral-700 text-white hover:bg-neutral-600 border border-neutral-700",
        ghost: "text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent",
        link: "text-orange-500 underline-offset-4 hover:underline border-none",
      },
      size: {
        default: "h-9 px-3 py-3 has-[>svg]:px-3",
        sm: "h-8 rounded gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded px-4 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
