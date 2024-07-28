"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
	urlParamName?: string;
	page: number | string;
	totalPages: number;
};

const Pagination = ({ urlParamName, page, totalPages }: PaginationProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const onClick = (buttonState: string) => {
		const pageNum = buttonState === "prev" ? Number(page) - 1 : Number(page) + 1;

		const urlName = formUrlQuery({
			params: searchParams.toString(),
			key: urlParamName || "page",
			value: pageNum.toString(),
		});

		router.push(urlName, { scroll: false });
	};

	return (
		<div className="flex justify-center m-3 ">
			{totalPages > 0 && (
				<div className="">
					<Button size="lg" variant="outline" onClick={() => onClick("prev")} disabled={Number(page) <= 1}>
						Previous
					</Button>
					<Button size="lg" variant="outline" onClick={() => onClick("next")} disabled={Number(page) >= totalPages}>
						Next
					</Button>
				</div>
			)}
		</div>
	);
};

export default Pagination;
