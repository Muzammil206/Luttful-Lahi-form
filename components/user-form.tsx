"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalDetailsSection } from "./form-sections/personal-details"
import { AddressSection } from "./form-sections/address-section"
import { ProfessionalSection } from "./form-sections/professional-section"
import { DocumentationSection } from "./form-sections/documentation-section"
import { FormProgress } from "./form-progress"

export function UserInformationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    age: "",

    // Residential Address
    residentialCity: "",
    residentialState: "",
    residentialCountry: "",

    // Origin Address
    originCity: "",
    originState: "",
    originCountry: "",

    // Documentation
    nin: "",
    passportNumber: "",
    passportExpiry: "",

    // Professional
    occupation: "",
    education: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const sections = [
    { title: "Personal Details", description: "Basic information about you" },
    { title: "Residential Address", description: "Where you currently live" },
    { title: "Origin Address", description: "Your place of origin" },
    { title: "Documentation", description: "Identification and travel documents" },
    { title: "Professional", description: "Career and education information" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {}

    switch (currentStep) {
      case 0: // Personal Details
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required"
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
        if (!formData.age || Number.parseInt(formData.age) < 18) newErrors.age = "Must be 18 or older"
        break
      case 1: // Residential Address
        if (!formData.residentialCity.trim()) newErrors.residentialCity = "City is required"
        if (!formData.residentialState.trim()) newErrors.residentialState = "State is required"
        if (!formData.residentialCountry.trim()) newErrors.residentialCountry = "Country is required"
        break
      case 2: // Origin Address
        if (!formData.originCity.trim()) newErrors.originCity = "City is required"
        if (!formData.originState.trim()) newErrors.originState = "State is required"
        if (!formData.originCountry.trim()) newErrors.originCountry = "Country is required"
        break
      case 3: // Documentation
        if (!formData.nin.trim()) newErrors.nin = "NIN is required"
        if (!formData.passportNumber.trim()) newErrors.passportNumber = "Passport number is required"
        if (!formData.passportExpiry) newErrors.passportExpiry = "Expiry date is required"
        break
      case 4: // Professional
        if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required"
        if (!formData.education.trim()) newErrors.education = "Education level is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, sections.length - 1))
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleAddressComplete = () => {
    handleNext()
  }

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      console.log("Form Data:", formData)
      setIsSubmitted(true)
    }
  }

  return (
    <div className="space-y-6">
      <FormProgress currentStep={currentStep} totalSteps={sections.length} sections={sections} />

      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary via-primary/80 to-accent px-4 py-6 rounded-2xl">
          <CardTitle className="text-primary-foreground text-2xl">{sections[currentStep].title}</CardTitle>
          <CardDescription className="text-primary-foreground/80">{sections[currentStep].description}</CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          {isSubmitted && currentStep === sections.length - 1 ? (
            <div className="text-center py-12">
              <div className="mb-4 text-6xl text-accent font-bold">✓</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Successfully Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Your information has been received and will be processed shortly. Thank you for registering with
                Luttful-Lahi International.
              </p>
              <Button
                onClick={() => {
                  setCurrentStep(0)
                  setIsSubmitted(false)
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    age: "",
                    residentialCity: "",
                    residentialState: "",
                    residentialCountry: "",
                    originCity: "",
                    originState: "",
                    originCountry: "",
                    nin: "",
                    passportNumber: "",
                    passportExpiry: "",
                    occupation: "",
                    education: "",
                  })
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit Another Form
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {currentStep === 0 && (
                <PersonalDetailsSection formData={formData} errors={errors} onInputChange={handleInputChange} />
              )}

              {currentStep === 1 && (
                <AddressSection
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                  onComplete={handleAddressComplete}
                  type="residential"
                />
              )}

              {currentStep === 2 && (
                <AddressSection
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                  onComplete={handleAddressComplete}
                  type="origin"
                />
              )}

              {currentStep === 3 && (
                <DocumentationSection formData={formData} errors={errors} onInputChange={handleInputChange} />
              )}

              {currentStep === 4 && (
                <ProfessionalSection formData={formData} errors={errors} onInputChange={handleInputChange} />
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-8 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex-1 bg-transparent"
                >
                  Previous
                </Button>

                {currentStep === sections.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Submit Form
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Next Step
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
