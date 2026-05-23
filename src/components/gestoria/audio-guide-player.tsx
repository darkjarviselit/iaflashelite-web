"use client";

import { Download, Gauge } from "lucide-react";
import { useRef, useState } from "react";

const SPEEDS = [1, 1.25, 1.5, 1.8, 2] as const;

type PlaybackSpeed = (typeof SPEEDS)[number];

type AudioGuide = {
    readonly description: string;
    readonly href: string;
    readonly title: string;
};

const AUDIO_GUIDES: ReadonlyArray<AudioGuide> = [
    {
        title: "Qué es GestorIA y cómo ayuda a tu gestoría",
        description:
            "Una explicación sencilla para entender el piloto, qué hace el asistente y dónde entra la revisión humana.",
        href: "/gestoria/audio/gestoria-audio-01-que-es-gestoria.m4a",
    },
    {
        title: "Qué motor IA elegir sin gastar de más",
        description:
            "Opciones económicas, modelos recomendados y avisos para no empezar por configuraciones caras o demasiado técnicas.",
        href: "/gestoria/audio/gestoria-audio-02-motores-ia-economicos.m4a",
    },
];

export function AudioGuidePlayer() {
    return (
        <div className="grid gap-5 lg:grid-cols-2">
            {AUDIO_GUIDES.map((audio) => (
                <AudioGuideCard key={audio.href} audio={audio} />
            ))}
        </div>
    );
}

function AudioGuideCard({ audio }: { readonly audio: AudioGuide }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [speed, setSpeed] = useState<PlaybackSpeed>(1);

    const applySpeed = (nextSpeed: PlaybackSpeed): void => {
        setSpeed(nextSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = nextSpeed;
        }
    };

    return (
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
            <div className="flex min-h-28 flex-col justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flash">
                        Audio guía
                    </p>
                    <h3 className="mt-3 text-xl font-semibold leading-tight text-paper">
                        {audio.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                        {audio.description}
                    </p>
                </div>
                <a
                    href={audio.href}
                    download
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-flash/30 px-4 py-2 text-sm font-medium text-flash transition-colors hover:border-flash hover:bg-flash/10"
                >
                    <Download className="h-4 w-4" />
                    Descargar audio
                </a>
            </div>

            <audio
                ref={audioRef}
                className="mt-6 w-full"
                controls
                preload="metadata"
                onLoadedMetadata={() => {
                    if (audioRef.current) {
                        audioRef.current.playbackRate = speed;
                    }
                }}
            >
                <source src={audio.href} type="audio/mp4" />
                Tu navegador no puede reproducir este audio.
            </audio>

            <div className="mt-5 rounded-xl border border-white/10 bg-onyx/60 p-3">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                    <Gauge className="h-4 w-4 text-flash" />
                    Velocidad
                </div>
                <div className="flex flex-wrap gap-2">
                    {SPEEDS.map((option) => {
                        const active = option === speed;
                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => applySpeed(option)}
                                aria-pressed={active}
                                className={`h-9 min-w-14 rounded-full border px-3 text-sm font-semibold transition-colors ${
                                    active
                                        ? "border-flash bg-flash text-onyx"
                                        : "border-white/10 bg-white/[0.03] text-paper hover:border-flash/60"
                                }`}
                            >
                                {option}x
                            </button>
                        );
                    })}
                </div>
            </div>
        </article>
    );
}
