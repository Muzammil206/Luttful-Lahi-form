"use client"

import { Input } from "@/components/ui/input"
import { FormField } from "../form-field"

interface PersonalDetailsSectionProps {
  formData: any
  errors: Record<string, string>
  onInputChange: (field: string, value: string) => void
}

export function PersonalDetailsSection({ formData, errors, onInputChange }: PersonalDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="First Name" error={errors.firstName} required>
          <Input
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => onInputChange("firstName", e.target.value)}
            className={errors.firstName ? "border-destructive" : ""}
          />
        </FormField>

        <FormField label="Last Name" error={errors.lastName} required>
          <Input
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => onInputChange("lastName", e.target.value)}
            className={errors.lastName ? "border-destructive" : ""}
          />
        </FormField>
      </div>

      <FormField label="Email Address" error={errors.email} required>
        <Input
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          className={errors.email ? "border-destructive" : ""}
        />
      </FormField>

      <FormField label="Phone Number" error={errors.phoneNumber} required>
        <Input
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phoneNumber}
          onChange={(e) => onInputChange("phoneNumber", e.target.value)}
          className={errors.phoneNumber ? "border-destructive" : ""}
        />
      </FormField>

      <FormField label="Age" error={errors.age} required>
        <Input
          type="number"
          placeholder="25"
          value={formData.age}
          onChange={(e) => onInputChange("age", e.target.value)}
          className={errors.age ? "border-destructive" : ""}
          min="18"
          max="120"
        />
      </FormField>
    </div>
  )
}
