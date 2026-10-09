import { FieldArrayWithId, UseFieldArrayReturn } from "react-hook-form";
import { ScheduleType } from "../model/schema";
import { Table } from "@/components/ui/table";
import { Employee } from "@/bd-test/employee";
import ScheduleHeaderEdit from "../../schedule/ui/schedule-header";
import ScheduleBodyEdit from "./schedule-body-edit";
import ScheduleTableFooter from "@/features/schedule/ui/schedule-footer";
import { ShiftCounts } from "../model/type";
import ScheduleTableHeader from "../../schedule/ui/schedule-header";

interface ScheduleTableProps {
  tab: string;
  shiftCounts: ShiftCounts | null;
  fields: FieldArrayWithId<ScheduleType, "rowShifts", "id">[];
  selectedEmployees: Employee[];
  remove: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["remove"];
  move: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["move"];
  update: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["update"];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}
export default function ScheduleTable({
  selectedDay,
  setSelectedDay,
  fields,
  selectedEmployees,
  remove,
  move,
  update,
  shiftCounts,
  tab,
}: ScheduleTableProps) {
  return (
    <Table className="mt-4 table-fixed">
      <ScheduleTableHeader
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />

      <ScheduleBodyEdit
        selectedDay={selectedDay}
        fields={fields}
        selectedEmployees={selectedEmployees}
        setSelectedDay={setSelectedDay}
        remove={remove}
        move={move}
        update={update}
      />

      <ScheduleTableFooter shiftCounts={shiftCounts} role={tab as string} />
    </Table>
  );
}
