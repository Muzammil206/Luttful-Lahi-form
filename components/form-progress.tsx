interface FormProgressProps {
  currentStep: number
  totalSteps: number
  sections: Array<{ title: string; description: string }>
}

export function FormProgress({ currentStep, totalSteps, sections }: FormProgressProps) {
  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between gap-2">
        {sections.map((section, index) => (
          <div key={index} className="flex-1">
            <div
              className={`p-3 rounded-lg text-center text-sm font-semibold transition-all ${
                index === currentStep
                  ? "bg-primary text-primary-foreground ring-2 ring-accent"
                  : index < currentStep
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              <div className="text-xs opacity-75">Step {index + 1}</div>
              <div className="text-xs truncate hidden sm:block">{section.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
