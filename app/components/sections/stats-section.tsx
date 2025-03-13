export function StatsSection() {
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "1,000+", label: "Quiz Questions" },
            { value: "54", label: "Countries Covered" },
            { value: "5", label: "Topic Categories" },
            { value: "10K+", label: "Active Learners" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-600">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

