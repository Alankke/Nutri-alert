"use client"
import Link from "next/link"
import { SignIn } from "@clerk/nextjs"
import { Separator } from "@/components/ui/separator"

export function SignInForm() {
  return (
    <div className="space-y-6">
      <SignIn appearance={{
        elements: {
          header: {
            display: "none"
          },
          card: {
            boxShadow: "none",
            border: "none",
          },
          cardBox: {
            width: "200%",
            boxShadow: "none",
            border: "none"
          },
          footer: {
            display: "none"
          },
          formButtonPrimary: {
            backgroundImage: "linear-gradient(to bottom, #20c997, #099268)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          },
        }
      }} />
      <Separator className="w-full" />
      <p className="text-center text-sm font-medium text-muted-foreground">¿No tenes una cuenta?{" "}
        <Link href="/sign-up">
          <span className="text-green-600 underline text-sm font-medium">Registrate</span>
        </Link>
      </p>
    </div>
  )
}