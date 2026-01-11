"use client"
import { FormField } from "../form-field"

interface ProfessionalSectionProps {
  formData: any
  errors: Record<string, string>
  onInputChange: (field: string, value: string) => void
}

const OCCUPATIONS = [
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Data Scientist",
  "Marketing Manager",
  "Sales Representative",
  "Business Analyst",
  "Student",
  "Self-Employed",
  "Other",
]

const EDUCATION_LEVELS = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Diploma/Certificate",
  "Trade School",
  "Other",
]

export function ProfessionalSection({ formData, errors, onInputChange }: ProfessionalSectionProps) {
  return (
    <div className="space-y-6">
      <FormField label="Occupation" error={errors.occupation} required>
        <select
          value={formData.occupation}
          onChange={(e) => onInputChange("occupation", e.target.value)}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
            errors.occupation ? "border-destructive" : ""
          }`}
        >
          <option value="">Select your occupation</option>
          {OCCUPATIONS.map((occupation) => (
            <option key={occupation} value={occupation}>
              {occupation}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Educational Qualifications" error={errors.education} required>
        <select
          value={formData.education}
          onChange={(e) => onInputChange("education", e.target.value)}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
            errors.education ? "border-destructive" : ""
          }`}
        >
          <option value="">Select education level</option>
          {EDUCATION_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </FormField>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <p className="text-sm text-green-800 dark:text-green-300">
          <span className="font-semibold">✓ Almost done!</span> Review your information and click Submit to complete the
          registration.
        </p>
      </div>
    </div>
  )
}
