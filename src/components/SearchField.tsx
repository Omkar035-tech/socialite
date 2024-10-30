"use client"

import { useRouter } from "next/navigation"
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";


const SearchField = () => {
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //this is a progressive enhancement 
        //if any  device javascript is disabled then its deficult to redirect user on correct url
        //method="GET" onSubmit={handleSubmit} action='/search' helps to works the seach feature without js
        e.preventDefault();
        const form = e.currentTarget;
        const q = (form.q as HTMLInputElement).value.trim();

        if (!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
    }

    return (
        <form method="GET" onSubmit={handleSubmit} action='/search'>
            <div className="relative ">
                <Input name="q" placeholder="Search" className="pe-10" />
                <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
            </div>
        </form>
    )
}

export default SearchField