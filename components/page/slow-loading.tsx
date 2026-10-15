export function SlowLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
      <div className="relative flex size-24 items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            className="stroke-muted"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={100}
            className="ring-fill stroke-primary"
          />
        </svg>
        <span className="count-up text-2xl font-semibold tabular-nums" />
      </div>
      <p className="text-sm text-muted-foreground">
        server is processing your request...
      </p>
    </div>
  );
}
