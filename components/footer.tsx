import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span>© 2024 LocalGov.AI. All rights reserved.</span>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Image
            src="/black_circle_360x360.png"
            alt="Powered by Bolt"
            width={24}
            height={24}
            className="dark:hidden"
          />
          <Image
            src="/white_circle_360x360.png"
            alt="Powered by Bolt"
            width={24}
            height={24}
            className="hidden dark:block"
          />
        </div>
      </div>
    </footer>
  )
}

export { Footer }