"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLibrary } from "@/components/library-provider"
import { useToast } from "@/hooks/use-toast"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { subscribeToNewsletter } = useLibrary()
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      subscribeToNewsletter(email)
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
      />
      <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-primary hover:bg-white/90">
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  )
}
