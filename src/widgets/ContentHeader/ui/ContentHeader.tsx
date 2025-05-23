import { ChevronLeft } from "lucide-react";
import { type ReactNode } from "react";
import { useNavigate } from "react-router";

import { useStatusBarColor } from "@/shared/dom/useStatusBarColor";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

interface ContentHeader {
  withBackArrow?: boolean;
  title?: string;
  rightContent?: ReactNode;
  className?: string;
}
export const ContentHeader = ({
  withBackArrow = true,
  title,
  rightContent,
  className,
}: ContentHeader) => {
  const navigate = useNavigate();

  useStatusBarColor("--surface-container");

  return (
    <header
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-2 items-center bg-surface-container p-4 rounded-b-3xl shadow-md sticky top-0 z-10 md:rounded-t-3xl md:mx-20",
        className,
      )}
    >
      {withBackArrow && (
        <Button
          variant="ghost"
          onClick={() => {
            navigate(-1);
          }}
          className="p-0!"
        >
          <ChevronLeft className="text-secondary size-[30px]" />
        </Button>
      )}
      {title && (
        <h1 className="font-semibold truncate whitespace-nowrap">{title}</h1>
      )}
      {rightContent}
    </header>
  );
};
