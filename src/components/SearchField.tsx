"use client";

import { useRouter } from "next/navigation";

interface SearchFieldProps {
  className?: string;
}

export default function SearchField({ className }: SearchFieldProps) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/shop?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="GET"
      action="/shop"
      className="grow border-red-500 pe-10"
    >
      <div className="relative border-red-500 pe-10">
        <input name="q" placeholder="Search" className="border-red-500 pe-10" />
        <p className="text-muted-foreground absolute right-3 top-1/2 size-5 -translate-y-1/2 transform">
          🔎
        </p>
      </div>
    </form>
  );
}
