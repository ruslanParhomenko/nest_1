import { FieldArrayWithId, UseFieldArrayReturn } from "react-hook-form";
import { ScheduleType } from "../model/schema";
import { Table } from "@/components/ui/table";
import ScheduleBodyEdit from "./schedule-body-edit";
import ScheduleTableHeader from "../../schedule/ui/schedule-header";
import ScheduleFooterEdit from "./schedule-footer-edit";
import type { GetEmployeesData } from "@/features/employee-create/model/schema";

interface ScheduleTableProps {
  tab: string;
  fields: FieldArrayWithId<ScheduleType, "rowShifts", "id">[];
  selectedEmployees: GetEmployeesData[];
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

      <ScheduleFooterEdit role={tab as string} />
    </Table>
  );
}
