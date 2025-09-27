import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded border px-2 py-1 text-xs font-medium font-mono w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-orange-500 focus-visible:ring-orange-500/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 aria-invalid:border-red-500 transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-orange-500 bg-orange-500 text-white [a&]:hover:bg-orange-500/90",
        secondary: "border-neutral-700 bg-neutral-700 text-white [a&]:hover:bg-neutral-600",
        destructive: "border-red-500 bg-red-500 text-white [a&]:hover:bg-red-500/90 focus-visible:ring-red-500/20",
        outline: "border-white bg-transparent text-white [a&]:hover:bg-neutral-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
