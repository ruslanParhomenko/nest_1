export default function EmployeeDataCard({
  icon: Icon,
  textCard,
  value,
}: {
  icon: React.ElementType;
  textCard: string;
  value: string;
}) {
  return (
    <div className="group grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors duration-200 hover:border-primary/20 hover:bg-muted/50 hover:text-blue-600">
      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="flex size-8 items-center justify-center rounded-lg bg-background shadow-sm">
          <Icon className="size-4 text-primary group-hover:text-blue-600" />
        </div>
        <span className="text-sm">{textCard}</span>
      </div>

      <div className="wrap-break-word  pr-4 text-md font-semibold tracking-tight">
        {value}
      </div>
    </div>
  );
}
