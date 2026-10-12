"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactElement, ReactNode } from "react";

type AppTooltipProps = {
  content: ReactNode;
  children?: ReactNode;
  render?: ReactElement;
};

export default function AppTooltip({
  content,
  children,
  render,
}: AppTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger render={render}>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
