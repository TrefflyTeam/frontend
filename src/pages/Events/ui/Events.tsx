import { ContentHeader } from "@/widgets/ContentHeader";
import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { useSwipeController } from "../controller/useSwipeController";
import { EventsPast } from "./EventsPast";
import { EventsUpcoming } from "./EventsUpcoming";

export const Events = () => {
  const { activeTab, setActiveTab, controls, handleDragEnd } =
    useSwipeController();

  return (
    <>
      <ContentHeader
        withBackArrow={false}
        title="Мероприятия"
        className="md:hidden"
      />
      <main className="h-full flex-1 flex flex-col overflow-auto no-scrollbar">
        <Tabs
          defaultValue="upcoming"
          className="gap-10 flex-1"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full flex justify-evenly pt-8">
            <TabsTrigger
              value="upcoming"
              className="w-fit"
              defaultValue={"upcoming"}
            >
              Предстоящие
            </TabsTrigger>
            <TabsTrigger value="past">Прошедшие</TabsTrigger>
          </TabsList>
          <div className="p-2 flex-1 md:mx-auto lg:w-2/4 flex">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={controls}
              className="flex w-full md:hidden"
              style={{ x: 0 }}
            >
              <div className="h-fit w-full flex [&:has(.error)]:h-full">
                <EventsTabs />
              </div>
            </motion.div>
            <div className="w-full hidden md:flex">
              <div className="h-fit w-full [&:has(.error)]:h-full">
                <EventsTabs />
              </div>
            </div>
          </div>
        </Tabs>
      </main>
    </>
  );
};

export const EventsTabs = () => {
  return (
    <>
      <TabsContent value="upcoming" asChild>
        <EventsUpcoming />
      </TabsContent>
      <TabsContent value="past" asChild>
        <EventsPast />
      </TabsContent>
    </>
  );
};
