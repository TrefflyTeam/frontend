import { ContentHeader } from "@/widgets/ContentHeader";
import { Info } from "lucide-react";
import { useState } from "react";

import { sklonenie } from "@/shared/lib/sklonenie";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { Textarea } from "@/shared/ui/textarea";

import { useAIDescGeneratorController } from "../controller/useAIDescGeneratorController";
import { DescriptionModal } from "./DescriptionModal";

interface AIDescGenerator {
  open: boolean;
  setOpen: (state: boolean) => void;
  eventName: string;
  onUse: (description: string) => void;
}

export const AIDescGenerator = ({
  open,
  setOpen,
  eventName,
  onUse,
}: AIDescGenerator) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const {
    maxLength,
    setMaxLength,
    description,
    setDescription,
    footerState,
    limit,
    remaining,
    displayTimer,
    timeLeft,
    isGenerationDisabled,
    generateDescription,
    generating,
  } = useAIDescGeneratorController({
    eventName,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "[&>button:last-child]:hidden w-full min-w-full h-full max-h-full",
          "rounded-none flex flex-col p-0 pb-4 overflow-hidden",
          "md:min-w-1/2",
        )}
      >
        <ContentHeader
          countPageHeader={false}
          className="py-1 mx-0! rounded-t-none!"
          onBackArrowClick={() => {
            setOpen(false);
          }}
          rightContent={
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsDescriptionOpen(true);
              }}
              className="flex items-center gap-2 ml-auto h-fit w-fit p-0"
              aria-label="Помощь AI"
            >
              <h1>Помощь AI</h1>
              <Info className="h-5 w-5" />
            </Button>
          }
        />
        <div className="p-4 flex flex-col gap-4 h-full">
          <p>Перед использованием введи название</p>
          <label>
            Максимальная длина (в символах):
            <div className="flex gap-2 mt-1 [&>button]:p-1 [&>button]:px-2 [&>button]:h-fit">
              <Button
                variant={maxLength === 100 ? "default" : "outline"}
                onClick={() => {
                  setMaxLength(100);
                }}
              >
                100
              </Button>
              <Button
                variant={maxLength === 500 ? "default" : "outline"}
                onClick={() => {
                  setMaxLength(500);
                }}
              >
                500
              </Button>
              <Button
                variant={maxLength === 1000 ? "default" : "outline"}
                onClick={() => {
                  setMaxLength(1000);
                }}
              >
                1000
              </Button>
            </div>
          </label>
          <Textarea
            variant="secondary"
            className="flex-1 max-h-full"
            placeholder="Напиши описание для мероприятия"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className="text-center">
            <p className="inline-block mr-1">
              Осталось попыток: {remaining}/{limit}.
            </p>
            {displayTimer && (
              <p className="inline-block">
                Обновление через {timeLeft}{" "}
                {sklonenie(timeLeft, ["минута", "минуты", "минут"])}
              </p>
            )}
          </div>
          {footerState === "generated" ? (
            <div className="flex gap-8 justify-between [&>button]:flex-1">
              <Button
                variant="outline"
                onClick={generateDescription}
                disabled={isGenerationDisabled}
                loading={generating}
              >
                Повторить
              </Button>
              <Button
                onClick={() => {
                  onUse(description);
                }}
              >
                Использовать
              </Button>
            </div>
          ) : (
            <Button
              onClick={generateDescription}
              disabled={isGenerationDisabled}
              loading={generating}
            >
              Сформировать
            </Button>
          )}
        </div>

        <DescriptionModal
          open={isDescriptionOpen}
          setOpen={setIsDescriptionOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
