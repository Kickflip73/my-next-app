'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-blue-100 text-blue-800",
        primary: "bg-blue-100 text-blue-800",
        secondary: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        danger: "bg-red-100 text-red-800",
        info: "bg-purple-100 text-purple-800",
      },
      size: {
        default: "text-xs px-2.5 py-0.5",
        sm: "text-xs px-2 py-0.5",
        lg: "text-sm px-3 py-1",
      },
      outline: {
        true: "bg-transparent border",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        outline: true,
        className: "border-blue-800 text-blue-800",
      },
      {
        variant: "primary",
        outline: true,
        className: "border-blue-800 text-blue-800",
      },
      {
        variant: "secondary",
        outline: true,
        className: "border-gray-800 text-gray-800",
      },
      {
        variant: "success",
        outline: true,
        className: "border-green-800 text-green-800",
      },
      {
        variant: "warning",
        outline: true,
        className: "border-yellow-800 text-yellow-800",
      },
      {
        variant: "danger",
        outline: true,
        className: "border-red-800 text-red-800",
      },
      {
        variant: "info",
        outline: true,
        className: "border-purple-800 text-purple-800",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      pill: true,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({
  className,
  variant,
  size,
  outline,
  pill,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={badgeVariants({ variant, size, outline, pill, className })}
      {...props}
    />
  );
};

export default Badge; 