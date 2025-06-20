import type { Event as EventModel } from "@/entities/Event";
import { Calendar, Crown, MapPin } from "lucide-react";
import { Link } from "react-router";

import { formatDateWithIntl } from "@/shared/lib/dateUtils";
import { routes } from "@/shared/router";
import { EventImagePreview } from "@/shared/ui/EventImagePreview";

export const Event = ({ event }: { event: EventModel }) => {
  return (
    <Link to={routes.event.replace(":id", event.id.toString())}>
      <figure
        className="mx-auto aspect-auto bg-surface-container rounded-3xl p-2 flex flex-col gap-2
      hover:opacity-60 active:opacity-60 h-full"
      >
        <div className="flex-1">
          {event?.imageEventUrl ? (
            <img
              className="aspect-video w-full rounded-lg bg-surface-container-highest"
              src={event.imageEventUrl}
              alt="Preview"
            />
          ) : (
            <EventImagePreview />
          )}
        </div>
        <div className="px-4 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {event.isPremium && <Crown className="text-premium w-[22px]" />}
            <figcaption className="font-semibold line-clamp-2">
              {event.name}
            </figcaption>
          </div>
          <div className="flex gap-2 items-center">
            <Calendar className="text-primary min-w-[22px] max-w-[22px]" />
            <h3 className="leading-none text-sm">
              {formatDateWithIntl(event.date)}
            </h3>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin className="text-primary min-w-[22px] max-w-[22px]" />
            <h3 className="leading-none text-sm">{event.address}</h3>
          </div>
        </div>
      </figure>
    </Link>
  );
};
