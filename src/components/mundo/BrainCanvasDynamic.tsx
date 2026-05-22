"use client";

import dynamic from "next/dynamic";

export const BrainCanvas = dynamic(
    () => import("@/components/mundo/Hero3D").then((module) => ({ default: module.BrainCanvas })),
    { ssr: false },
);
