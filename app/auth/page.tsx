"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthPage() {
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.push("/dashboard")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <div className="container flex h-[calc(100vh-8rem)] w-full flex-col items-center justify-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>Welcome to LocalGov.AI</CardTitle>
          <CardDescription>
            Sign in to access your personalized legal assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google", "github"]}
            theme="light"
            showLinks={true}
            view="sign_in"
          />
        </CardContent>
      </Card>
    </div>
  )
}