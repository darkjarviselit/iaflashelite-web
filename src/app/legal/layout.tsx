import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function LegalLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <main className="bg-onyx min-h-screen pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <article className="text-text-secondary text-[15px] leading-relaxed space-y-6 [&_h1]:text-4xl sm:[&_h1]:text-5xl [&_h1]:font-bold [&_h1]:tracking-[-0.025em] [&_h1]:leading-[1.05] [&_h1]:text-paper [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-paper [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-text-secondary [&_p]:leading-relaxed [&_a]:text-flash [&_a]:underline [&_a:hover]:no-underline [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-text-secondary [&_li]:leading-relaxed [&_strong]:text-paper [&_strong]:font-medium">
                        {children}
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
