"use client"

import { Moon, Rows3, ScanQrCode, Sun } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/lib/use-mobile"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { useState } from "react"

export default function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
  }

  return (
    <header className="w-full h-20 flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex w-full items-center justify-between max-w-full mx-auto">

        {/* Logo */}
        <div
          className="flex items-center gap-x-2.5 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <ScanQrCode />
          <span className="text-2xl font-bold text-primary">QRDeck</span>
        </div>

        {/* MOBILE */}
        {isMobile ? (
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme}>
              {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Rows3
              size={24}
              className="cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />

            {menuOpen && (
              <div className="absolute top-20 right-6 bg-neutral-900 text-white p-4 rounded-lg shadow-xl flex flex-col gap-4 z-50">
                <button onClick={() => router.push("/pricing")}>Pricing</button>
                <button onClick={() => router.push("/help")}>Help</button>

                {session?.user ? (
                  <>
                    <button onClick={() => router.push("/profile")}>
                      Profile
                    </button>
                    <button onClick={() => router.push("/settings")}>
                      Settings
                    </button>
                    <button className="text-red-400" onClick={() => signOut()}>
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    className="text-red-400"
                    onClick={() => router.push("/auth")}
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          /* DESKTOP */
          <nav className="flex items-center gap-6">
            <button onClick={toggleTheme} className="cursor-pointer">
              {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Select>
              <SelectTrigger className="w-20">Eng</SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>

            <button className="text-sm cursor-pointer">Help</button>
            <button className="text-sm cursor-pointer">Pricing</button>

            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="relative w-10 h-10 cursor-pointer">
                    <Image
                      src={session.user.image || "/land.jpg"}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="destructive"
                onClick={() => router.push("/auth")}
              >
                Login
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
