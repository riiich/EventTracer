"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProp = {
	urlParamName?: string;
	page: string | number;
	totalPages: number;
};

const Pagination = ({ urlParamName, page, totalPages }: PaginationProp) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const onClick = (buttonState: string) => {
		const pageValue = buttonState === "prev" ? Number(page) - 1 : Number(page) + 1;

		const urlName = formUrlQuery({
			params: searchParams.toString(),
			key: urlParamName || "page",
			value: pageValue.toString(),
		});

		router.push(urlName, { scroll: false });
	};

	return (
		<div className="flex gap-2 ">
			<Button size="lg" onClick={() => onClick("prev")} disabled={Number(page) <= 1}>
				Previous
			</Button>
			<Button size="lg" onClick={() => onClick("next")} disabled={Number(page) >= totalPages}>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
