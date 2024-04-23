import Link from "next/link";

const Footer = () => {
	return (
		<footer className="border-t ">
			<div className="flex wrapper flex-between flex-col gap-4 p-5 text-center sm:flex-row">
				<Link href="/">2024 EventTracer&copy; · All Rights Reserved</Link>
				<p>Placeholder</p>

			</div>
		</footer>
	);
};

export default Footer;
