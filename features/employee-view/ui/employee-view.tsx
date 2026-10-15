
"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GetEmployeesData } from "@/features/employee-create/model/schema";
import { formatDate } from "@/utils/get-format-date";

import {
  CalendarDays,
  Mail,
  Phone,
  PlaneTakeoff,
  User,
  Users2,
  Wallet,
} from "lucide-react";
import EmployeeDataCard from "./employee-data-card";
import VacationDataCard from "./vacation-data-card";

export function EmployeeViewPage({
  employee,
}: {
  employee: GetEmployeesData;
}) {


  const vacations = employee.vacation ?? [];

  return (
    <div className="mt-4 my-auto grid w-full  grid-cols-1 items-stretch justify-center  gap-5 md:grid-cols-[45%_55%] md:px-2">
<Card className="group flex min-w-0 flex-col border-0! shadow-none">
        <CardHeader className="pb-5 pt-6">

           <div className="flex min-w-0 items-center justify-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Users2 className="size-5 text-primary" />
            </div>

            <div className="min-w-0 space-y-1">
              <CardTitle className="text-base font-semibold tracking-tight">
                {employee.fullName}
              </CardTitle>
        
            </div>
          </div>
        
           

          
          

        </CardHeader>


        <CardContent className="flex flex-1 flex-col  gap-8 p-5">
                        <EmployeeDataCard icon={User} textCard={'role'} value={employee.role ?? "—"} />

                        <EmployeeDataCard icon={Wallet} textCard={'rate'} value={employee.currentRate ?? "—"} />
                                    <EmployeeDataCard icon={Mail} textCard={'mail'} value={employee.mail ?? "—"} />
                                                <EmployeeDataCard icon={Phone} textCard={'tel'} value={employee.tel ?? "—"} />
                                                <EmployeeDataCard icon={CalendarDays} textCard={'employment date'} value={employee.employmentDate ? formatDate(employee.employmentDate) : "—"} />



        

      
        </CardContent>
      </Card>

<Card className="group flex min-w-0 flex-col border-0! shadow-none!">
        <CardHeader className="pb-5 pt-6">
          <div className="flex min-w-0 items-center justify-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <PlaneTakeoff className="size-5 text-primary" />
            </div>

            <div className="min-w-0 space-y-1">
              <CardTitle className="text-base font-semibold tracking-tight">
                Отпуска
              </CardTitle>
        
            </div>
          </div>
        </CardHeader>


        <CardContent className="flex flex-1 flex-col  gap-8 p-5">
          {vacations.length > 0 && (
            vacations.map((vacation, index) => {
          
              return (
               <VacationDataCard key={`${vacation.startDate}-${vacation.endDate}-${index}`} vacation={vacation} index={index} />
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}



