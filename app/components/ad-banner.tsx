export function AdBanner({ position = "bottom" }: { position?: "top" | "bottom" | "sidebar" }) {
  return (
    <div
      className={`
      w-full bg-muted/30 border rounded-lg p-4 text-center text-sm text-muted-foreground
      ${position === "sidebar" ? "h-[600px]" : "h-[100px]"}
    `}
    >
      <div className="h-full flex items-center justify-center">
        <span>Advertisement</span>
      </div>
    </div>
  )
}

