import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { NavItems } from "./NavItems";
import Image from "next/image";

export const MobileNav = () => {
	return (
		<nav className="md:hidden">
			<Sheet>
				<SheetTrigger className="align-middle">
                    <Image src="/assets/icons/menu.svg" alt="menu" width={24} height={24} />
                </SheetTrigger>
				<SheetContent className="flex flex-col gap-6 bg-white md:hidden">
					{/* <Image src="/assets/images/logo.svg" alt="logo" width={128} height={38} /> */}
                    <h1 className="text-xl">EventTracer</h1>
                    <Separator className="border border-gray-250" />
                    <NavItems />
				</SheetContent>
			</Sheet>
		</nav>
	);
};
