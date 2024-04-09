import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavItems } from "./NavItems";
import { MobileNav } from "./MobileNav";

const Header = () => {
	return (
		<header className="w-screen border-b">
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
