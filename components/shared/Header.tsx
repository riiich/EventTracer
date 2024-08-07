"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavItems } from "./NavItems";
import { MobileNav } from "./MobileNav";
// import { useTheme } from "next-themes";
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

const Header = () => {
	// const { setTheme } = useTheme();

	return (
		<header className="w-screen border-b-2 bg-slate-50 fixed top-0 z-10">
			<div className="wrapper flex items-center justify-between">
				<Link href="/" className="w-36">
					<h5 className="h5-bold">EventTracer</h5>
					{/* <Image  className="md:hidden" src="/assets/images/logo.svg" alt="EventTracer_Logo" width={128} height={38} /> */}
				</Link>

				{/* Desktop Navbar */}
				<SignedIn>
					<nav className="hidden w-full max-w-xs md:flex-between">
						<NavItems />
					</nav>
				</SignedIn>

				{/* THEME */}
				{/* <DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle Theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu> */}

				<div className="flex w-32 justify-end gap-3">
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
						{/* Mobile Navbar */}
						<MobileNav />
					</SignedIn>
					<SignedOut>
						<Button asChild className="rounded-full" size="lg">
							<Link href="/sign-in">Login</Link>
						</Button>
					</SignedOut>
				</div>
			</div>
		</header>
	);
};

export default Header;
