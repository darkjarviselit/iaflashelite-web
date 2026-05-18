import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function LegalLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <article className="text-gray-700 text-[15px] leading-relaxed space-y-6 [&_h1]:text-4xl sm:[&_h1]:text-5xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:leading-[1.05] [&_h1]:text-gray-900 [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-gray-700 [&_p]:leading-relaxed [&_a]:text-cyan-600 [&_a]:underline [&_a:hover]:no-underline [&_a:hover]:text-cyan-700 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-gray-700 [&_li]:leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-semibold">
                        {children}
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
