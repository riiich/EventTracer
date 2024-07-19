"use client";

import Link from "next/link";
import { headerLinks } from "@/constants";
import { usePathname } from "next/navigation";

// import { Button } from "../ui/button";
// import { useTheme } from "next-themes";
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

export const NavItems = () => {
	const pathname = usePathname();
	// const { setTheme } = useTheme();
	
	return (
		<div className="flex flex-row">
			<ul className="flex w-full flex-col items-start gap-5 md:flex-between md:flex-row">
				{headerLinks.map((link) => {
					const isActive = pathname === link.route;

					return (
						<Link href={link.route} key={link.route}>
							<li
								className={`${
									isActive && "text-primary-500"
								} flex-center p-medium-16 whitespace-nowrap`}
								key={link.route}
							>
								{link.label}
							</li>
						</Link>
					);
				})}
			</ul>

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
		</div>
	);
};
