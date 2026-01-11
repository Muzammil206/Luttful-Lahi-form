"use client"

import { FormField } from "../form-field"
import { useMemo, useEffect } from "react"

interface AddressSectionProps {
  formData: any
  errors: Record<string, string>
  onInputChange: (field: string, value: string) => void
  onComplete?: () => void
  type: "residential" | "origin"
}

const LOCATION_DATA = {
  "United States": {
    states: {
      California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Oakland"],
      Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
      Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tampa Bay"],
      "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Albany"],
      Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
      Illinois: ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville"],
      Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
      Georgia: ["Atlanta", "Augusta", "Savannah", "Columbus", "Athens"],
      "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
      Michigan: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor"],
    },
  },
  Canada: {
    states: {
      Ontario: ["Toronto", "Ottawa", "Hamilton", "London", "Kitchener"],
      Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil"],
      "British Columbia": ["Vancouver", "Victoria", "Burnaby", "Surrey", "Richmond"],
      Alberta: ["Calgary", "Edmonton", "Lethbridge", "Red Deer", "Fort McMurray"],
      Manitoba: ["Winnipeg", "Brandon", "Missinippi", "Thompson", "Flin Flon"],
      Saskatchewan: ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Estevan"],
    },
  },
  "United Kingdom": {
    states: {
      England: ["London", "Manchester", "Birmingham", "Leeds", "Bristol"],
      Scotland: ["Edinburgh", "Glasgow", "Dundee", "Aberdeen", "Stirling"],
      Wales: ["Cardiff", "Swansea", "Newport", "Wrexham", "Barry"],
      "Northern Ireland": ["Belfast", "Derry", "Armagh", "Lisburn", "Newry"],
    },
  },
  Australia: {
    states: {
      "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Canberra"],
      Victoria: ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton"],
      Queensland: ["Brisbane", "Gold Coast", "Sunshine Coast", "Cairns", "Toowoomba"],
      "Western Australia": ["Perth", "Fremantle", "Mandurah", "Bunbury", "Karratha"],
      "South Australia": ["Adelaide", "Port Augusta", "Mount Gambier", "Gawler", "Whyalla"],
      Tasmania: ["Hobart", "Launceston", "Devonport", "Burnie", "Ulverstone"],
    },
  },
  Nigeria: {
    states: {
      Lagos: ["Victoria Island", "Lekki", "Ikoyi", "Surulere", "Ikeja"],
      Abuja: ["Central Business District", "Mabushi", "Garki", "Wuse", "Nyanya"],
      Kano: ["Kano City", "Fagge", "Dala", "Tarauni", "Gwale"],
      Rivers: ["Port Harcourt", "Obio-Akpor", "Bonny", "Okrika", "Eleme"],
      Oyo: ["Ibadan", "Oyo Town", "Ogbomosho", "Abeokuta", "Ijebu-Ode"],
      Enugu: ["Enugu City", "Nsukka", "Oji River", "Agbani", "Enugu North"],
    },
  },
  Ghana: {
    states: {
      "Greater Accra": ["Accra", "Tema", "Larteh", "Ashiaman", "Amasaman"],
      Ashanti: ["Kumasi", "Obuasi", "Sekondi-Takoradi", "Ejisu", "Asante Akim"],
      Central: ["Cape Coast", "Sekondi", "Takoradi", "Dunkwa", "Abura-Asebu-Kwamankese"],
      Northern: ["Tamale", "Bolgatanga", "Yendi", "Gushegu", "Bawku"],
      Volta: ["Ho", "Keta", "Aflao", "Asikuma", "Hohoe"],
    },
  },
  Kenya: {
    states: {
      Nairobi: ["Nairobi Central", "Westlands", "Karen", "Kilimani", "Rongai"],
      Mombasa: ["Mombasa City", "Diani", "Nyali", "Likoni", "Jomvu"],
      Kisumu: ["Kisumu City", "Kericho", "Nyamira", "Kisii", "Migori"],
      Nakuru: ["Nakuru City", "Eldoret", "Kericho", "Bomet", "Narok"],
      "Rift Valley": ["Kapsabet", "Kitale", "Marakwet", "Samburu", "Turkana"],
    },
  },
  India: {
    states: {
      Delhi: ["New Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi"],
      Maharashtra: ["Mumbai", "Pune", "Nagpur", "Aurangabad", "Nashik"],
      Karnataka: ["Bangalore", "Mysore", "Mangalore", "Belgaum", "Gulbarga"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruppur", "Vellore"],
      Telangana: ["Hyderabad", "Secunderabad", "Warangal", "Nizamabad", "Khammam"],
    },
  },
  Germany: {
    states: {
      Berlin: ["Berlin-Mitte", "Charlottenburg", "Kreuzberg", "Neukölln", "Pankow"],
      Bavaria: ["Munich", "Nuremberg", "Augsburg", "Regensburg", "Ingolstadt"],
      "North Rhine-Westphalia": ["Cologne", "Düsseldorf", "Dortmund", "Essen", "Duisburg"],
      Hesse: ["Frankfurt", "Wiesbaden", "Darmstadt", "Offenbach", "Kassel"],
      "Baden-Württemberg": ["Stuttgart", "Mannheim", "Heidelberg", "Karlsruhe", "Freiburg"],
    },
  },
  France: {
    states: {
      "Île-de-France": ["Paris", "Versailles", "Boulogne-Billancourt", "Saint-Denis", "Neuilly-sur-Seine"],
      "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Cannes", "Toulon", "Aix-en-Provence"],
      "Rhône-Alpes": ["Lyon", "Grenoble", "Saint-Étienne", "Villeurbanne", "Annecy"],
      "Nouvelle-Aquitaine": ["Bordeaux", "Limoges", "Poitiers", "Angoulême", "La Rochelle"],
      Occitanie: ["Toulouse", "Montpellier", "Nîmes", "Perpignan", "Albi"],
    },
  },
}

export function AddressSection({ formData, errors, onInputChange, onComplete, type }: AddressSectionProps) {
  const prefix = type === "residential" ? "residential" : "origin"

  const countries = Object.keys(LOCATION_DATA)

  const selectedCountry = formData[`${prefix}Country`] as string
  const availableStates =
    selectedCountry && LOCATION_DATA[selectedCountry as keyof typeof LOCATION_DATA]
      ? Object.keys(LOCATION_DATA[selectedCountry as keyof typeof LOCATION_DATA].states)
      : []

  const selectedState = formData[`${prefix}State`] as string
  const selectedCity = formData[`${prefix}City`] as string

  const availableCities = useMemo(() => {
    if (!selectedCountry || !selectedState) return []
    const countryData = LOCATION_DATA[selectedCountry as keyof typeof LOCATION_DATA]
    return countryData?.states[selectedState as keyof typeof countryData.states] || []
  }, [selectedCountry, selectedState])

  useEffect(() => {
    if (selectedCountry && selectedState && selectedCity && onComplete) {
      const timer = setTimeout(() => {
        onComplete()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [selectedCountry, selectedState, selectedCity, onComplete])

  const handleCountryChange = (value: string) => {
    onInputChange(`${prefix}Country`, value)
    onInputChange(`${prefix}State`, "")
    onInputChange(`${prefix}City`, "")
  }

  const handleStateChange = (value: string) => {
    onInputChange(`${prefix}State`, value)
    onInputChange(`${prefix}City`, "")
  }

  return (
    <div className="space-y-6">
      <FormField label="Country" error={errors[`${prefix}Country`]} required>
        <select
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e.target.value)}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
            errors[`${prefix}Country`] ? "border-destructive" : ""
          }`}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="State/Province/Region" error={errors[`${prefix}State`]} required>
        <select
          value={selectedState}
          onChange={(e) => handleStateChange(e.target.value)}
          disabled={!selectedCountry}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            errors[`${prefix}State`] ? "border-destructive" : ""
          }`}
        >
          <option value="">{selectedCountry ? "Select a state" : "Select a country first"}</option>
          {availableStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="City" error={errors[`${prefix}City`]} required>
        <select
          value={selectedCity}
          onChange={(e) => onInputChange(`${prefix}City`, e.target.value)}
          disabled={!selectedState}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            errors[`${prefix}City`] ? "border-destructive" : ""
          }`}
        >
          <option value="">{selectedState ? "Select a city" : "Select a state first"}</option>
          {availableCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </FormField>
    </div>
  )
}
