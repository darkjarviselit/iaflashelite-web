"use client";

import { ArrowRight, Bell } from "lucide-react";
import { useState } from "react";
import { WaitlistModal } from "@/components/waitlist-modal";
import { Button } from "@/components/ui/button";
import type { ProductStatus } from "@/lib/constants";

interface ProductAvailabilityProps {
    slug: string;
    name: string;
    status: ProductStatus;
    price: number;
}

export function ProductAvailability({
    slug,
    name,
    status,
    price,
}: ProductAvailabilityProps) {
    const [open, setOpen] = useState(false);

    if (status === "available") {
        return (
            <Button href={`/productos/${slug}/comprar`} size="lg">
                Comprar ({price}€) <ArrowRight size={16} />
            </Button>
        );
    }

    return (
        <>
            <Button size="lg" variant="secondary" onClick={() => setOpen(true)}>
                <Bell size={16} /> Avísame por email
            </Button>
            <WaitlistModal
                open={open}
                productSlug={slug}
                productName={name}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
