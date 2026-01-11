import { UserInformationForm } from "@/components/user-form"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-muted/30  px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 text-center">
          <div className="flex justify-center ">
            <Image
              src="/lg.png"
              alt="Luttful-Lahi International Logo"
              width={100}
              height={100}
              className="h-50 w-50 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Lutful-Lahi International</h1>
          <p className="text-lg text-primary font-semibold mb-1">User Information Registration</p>
          <p className="text-muted-foreground">Complete all sections below to register your information securely</p>
        </div>
        <UserInformationForm />
      </div>
    </main>
  )
}
