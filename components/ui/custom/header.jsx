"use client";

import { Moon, ScanQrCode, Sun } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../select";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../button";
import { redirect } from "next/router";

export default function Header() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (!theme) return;
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <header className="w-full h-20 flex items-center px-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
                <div className="flex justify-between items-center gap-x-2.5" onClick={() => redirect('/')}>
                    <span>
                        <ScanQrCode />
                    </span>
                    <span className="text-2xl font-bold text-primary">QRDeck</span>
                </div>

                <nav className="flex items-center gap-6">

                    <button onClick={toggleTheme} className="cursor-pointer">
                        {theme === "light" ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
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

                    {
                        session?.user?.image
                            ?
                            <div className="relative w-10 h-10">
                                <Select className="outline-none border-none ring-none bg-transparent w-fit">
                                    <SelectTrigger className="w-20 outline-none border-none ring-none">
                                        <Image
                                            src={session.user.image || "/land.jpg"}
                                            alt="Profile"
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="outline-none border-none ring-none flex flex-col gap-2">
                                        <div>
                                            <SelectItem value="profile">Profile</SelectItem>
                                            <SelectItem value="settings">Settings</SelectItem>
                                            <Button variant={"destructive"} value="logout" onClick={() => signOut()}>Logout</Button>
                                        </div>
                                    </SelectContent>
                                </Select>

                            </div>
                            : <Button variant="destructive" onClick={() => redirect('/auth')}>Login</Button>
                    }
                </nav>

            </div>
        </header>
    );
}
