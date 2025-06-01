import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © 2024 LocalGov.AI. All rights reserved.
        </p>
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