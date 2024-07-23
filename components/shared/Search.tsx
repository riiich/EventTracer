"use client";

import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({ placeholder = "Search..." }: { placeholder?: string }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const searchParams = useSearchParams();
	const router = useRouter();

	// filter for events through the query params in url
	useEffect(() => {
		// debounce function to prevent api calls on every key stroke
		const debounce = setTimeout(async () => {
			let newUrl = "";

			if (searchQuery) {
				newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: "searchQuery",
					value: searchQuery,
				});
			} else {
				newUrl = removeKeysFromQuery({
					params: searchParams.toString(),
					keysToRemove: ["searchQuery"],
				});
			}

			router.push(newUrl, { scroll: false });
		}, 300);

		return () => clearTimeout(debounce);
	}, [searchQuery, searchParams, router]);

	return (
		<div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-gray-100 px-4 py-2">
			<Image src="/assets/icons/search.svg" alt="searchImg" width={25} height={25} />
			<Input
				type="text"
				className="bg-gray-100  border-0 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
				placeholder={placeholder}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
		</div>
	);
};

export default Search;
