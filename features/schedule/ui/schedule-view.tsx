"use client";
import { GetScheduleData } from "@/features/schedule-edit/model/type";
import ScheduleTableHeader from "./schedule-header";
import { Table } from "@/components/ui/table";
import ScheduleTableFooter from "./schedule-footer";
import { getShiftCounts } from "@/features/schedule-edit/lib/utils";
import ScheduleBody from "./schedule-body";

export  function ScheduleView({
  schedule,
  tab
}: {
  schedule: GetScheduleData | null;
  tab: string
}) {
  
    const todayDay = new Date().getDate();
    const shiftCounts = getShiftCounts(schedule?.rowShifts ?? []);
    
    if (!schedule) {
      return (
        <div className="mt-4 flex items-center justify-center text-red-600">
          <p>Нет расписания</p>
        </div>
      );
    }
  
  return (
    <div className="flex h-dvh items-center justify-center">
      <Table>

      <ScheduleTableHeader selectedDay={todayDay} setSelectedDay={()=>{}}/>
      <ScheduleBody schedule={schedule} selectedDay={todayDay}/>
      <ScheduleTableFooter shiftCounts={shiftCounts} role={tab}/>
      </Table>
      </div>
  );
}
