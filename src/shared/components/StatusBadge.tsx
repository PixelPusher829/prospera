import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { ClientStatus } from "@/shared/types/types";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full min-w-20 px-3 py-1.5 text-xs font-medium",
  {
    variants: {
      status: {
        [ClientStatus.Active]:
          "bg-green-100 text-green-800 dark:bg-green-700/30 dark:text-green-400",
        [ClientStatus.Pending]:
          "bg-amber-100 text-amber-800 dark:bg-amber-700/30 dark:text-amber-400",
        [ClientStatus.Inactive]:
          "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
        cleared:
          "bg-green-100 text-green-800 dark:bg-green-700/30 dark:text-green-400",
        pending:
          "bg-amber-100 text-amber-800 dark:bg-amber-700/30 dark:text-amber-400",
      },
    },
    defaultVariants: {
      status: ClientStatus.Pending,
    },
  },
);

export interface StatusBadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: ClientStatus | "cleared" | "pending";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  className,
  status,
  ...props
}) => {
  return (
    <div className={statusBadgeVariants({ status, className })} {...props}>
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          status === ClientStatus.Active || status === "cleared"
            ? "bg-green-500"
            : ""
        } ${
          status === ClientStatus.Pending || status === "pending"
            ? "bg-amber-400"
            : ""
        } ${status === ClientStatus.Inactive ? "bg-slate-400" : ""}`}
      ></span>
      {status}
    </div>
  );
};

export default StatusBadge;
