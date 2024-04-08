"use client";

import Link from "next/link";
import { headerLinks } from "@/constants";
import { usePathname } from "next/navigation";

export const NavItems = () => {
	const pathname = usePathname();

	return (
		<ul className="md:flex-between md:flex-row flex w-full flex-col items-start gap-5">
			{headerLinks.map((link) => {
				const isActive = pathname === link.route;

				return (
					<Link href={link.route}>
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
	);
};
