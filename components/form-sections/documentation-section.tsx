"use client"

import { Input } from "@/components/ui/input"
import { FormField } from "../form-field"

interface DocumentationSectionProps {
  formData: any
  errors: Record<string, string>
  onInputChange: (field: string, value: string) => void
}

export function DocumentationSection({ formData, errors, onInputChange }: DocumentationSectionProps) {
  return (
    <div className="space-y-6">
      <FormField label="National Identification Number (NIN)" error={errors.nin} required>
        <Input
          placeholder="123-45-6789"
          value={formData.nin}
          onChange={(e) => onInputChange("nin", e.target.value)}
          className={errors.nin ? "border-destructive" : ""}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Passport Number" error={errors.passportNumber} required>
          <Input
            placeholder="PA1234567"
            value={formData.passportNumber}
            onChange={(e) => onInputChange("passportNumber", e.target.value)}
            className={errors.passportNumber ? "border-destructive" : ""}
          />
        </FormField>

        <FormField label="Passport Expiry Date" error={errors.passportExpiry} required>
          <Input
            type="date"
            value={formData.passportExpiry}
            onChange={(e) => onInputChange("passportExpiry", e.target.value)}
            className={errors.passportExpiry ? "border-destructive" : ""}
          />
        </FormField>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <span className="font-semibold">📋 Note:</span> Your documentation will be securely stored and encrypted. We
          comply with all data protection regulations.
        </p>
      </div>
    </div>
  )
}
