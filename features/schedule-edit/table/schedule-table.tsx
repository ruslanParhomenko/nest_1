import { FieldArrayWithId, UseFieldArrayReturn } from "react-hook-form";
import { ScheduleType } from "../model/schema";
import { Table } from "@/components/ui/table";
import ScheduleBodyEdit from "./schedule-body-edit";
import ScheduleTableHeader from "../../schedule/ui/schedule-header";
import ScheduleFooterEdit from "./schedule-footer-edit";
import type { GetEmployeesData } from "@/features/employee-create/model/schema";

interface ScheduleTableProps {
  fields: FieldArrayWithId<ScheduleType, "rowShifts", "id">[];
  selectedEmployees: GetEmployeesData[] | null;
  remove: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["remove"];
  move: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["move"];
  update: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["update"];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  addNewRow?: () => void;
}
export default function ScheduleTable({
  selectedDay,
  setSelectedDay,
  fields,
  selectedEmployees,
  remove,
  move,
  update,
  addNewRow,
}: ScheduleTableProps) {
  if (selectedEmployees?.length === 0) {
    return (
      <div className="mt-4 flex items-center justify-center text-red-600">
        <p>Нет сотрудников</p>
      </div>
    );
  }
  return (
    <Table className="mt-4 table-fixed">
      <ScheduleTableHeader
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        addNewRow={addNewRow}
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

      <ScheduleFooterEdit />
    </Table>
  );
}
