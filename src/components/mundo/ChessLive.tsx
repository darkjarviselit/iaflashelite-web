"use client";

import { Chess, type Move } from "chess.js";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { GlassCard } from "@/components/mundo/GlassCard";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/ui/section-label";

const LIVE_MOVES = [
    "e2e4",
    "e7e5",
    "g1f3",
    "b8c6",
    "f1b5",
    "a7a6",
    "b5a4",
    "g8f6",
    "e1g1",
    "f8e7",
    "f1e1",
    "b7b5",
    "a4b3",
    "d7d6",
    "c2c3",
    "e8g8",
    "h2h3",
    "c6b8",
    "d2d4",
    "b8d7",
] as const;

const PIECES: Record<string, string> = {
    K: "♔",
    Q: "♕",
    R: "♖",
    B: "♗",
    N: "♘",
    P: "♙",
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟",
};

type BoardSquare = string | null;

function boardFromFen(fen: string): BoardSquare[][] {
    return fen
        .split(" ")[0]
        .split("/")
        .map((row) => {
            const squares: BoardSquare[] = [];
            for (const char of row) {
                const emptyCount = Number.parseInt(char, 10);
                if (Number.isNaN(emptyCount)) {
                    squares.push(char);
                } else {
                    for (let i = 0; i < emptyCount; i += 1) squares.push(null);
                }
            }
            return squares;
        });
}

function replayGame(step: number) {
    const chess = new Chess();
    for (let i = 0; i < step; i += 1) {
        const move = LIVE_MOVES[i];
        chess.move({
            from: move.slice(0, 2),
            to: move.slice(2, 4),
            promotion: "q",
        });
    }
    return {
        board: boardFromFen(chess.fen()),
        fen: chess.fen(),
        history: chess.history({ verbose: true }) as Move[],
        turn: chess.turn() === "w" ? "Blancas" : "Negras",
    };
}

export function ChessLive() {
    const [step, setStep] = useState(0);
    const panelRef = useRef<HTMLDivElement>(null);
    const game = useMemo(() => replayGame(step), [step]);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setStep((current) => (current + 1) % (LIVE_MOVES.length + 1));
        }, 2000);
        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        if (panelRef.current) {
            panelRef.current.scrollTop = panelRef.current.scrollHeight;
        }
    }, [game.history.length]);

    const lastMove = game.history.at(-1);

    return (
        <section className="relative overflow-hidden bg-[#080808] px-6 py-28 md:py-36">
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,229,255,0.12),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_30%)]"
            />
            <div className="relative mx-auto max-w-[1180px]">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <SectionLabel>Partida en vivo</SectionLabel>
                        <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-paper md:text-6xl">
                            G.I.R.U vs Agente Anónimo — En tiempo real
                        </h2>
                    </div>
                    <Badge variant="white">
                        <span className="mr-2 inline-flex h-2 w-2 animate-pulse rounded-full bg-red-500" />
                        EN VIVO
                    </Badge>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.7fr)] lg:items-center">
                    <GlassCard glow className="mx-auto w-full max-w-md p-3 md:p-4">
                        <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-xl border border-white/10">
                            {game.board.flatMap((row, rowIndex) =>
                                row.map((piece, colIndex) => {
                                    const square = `${rowIndex}-${colIndex}`;
                                    const isLight = (rowIndex + colIndex) % 2 === 0;
                                    const isRecent =
                                        lastMove?.to ===
                                        `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;

                                    return (
                                        <motion.div
                                            key={square}
                                            layout
                                            className={
                                                isLight
                                                    ? "relative flex items-center justify-center bg-cyan-400/12"
                                                    : "relative flex items-center justify-center bg-white/[0.04]"
                                            }
                                        >
                                            {isRecent ? (
                                                <motion.span
                                                    layoutId="recent-move"
                                                    className="absolute inset-1 rounded-lg bg-flash/20"
                                                />
                                            ) : null}
                                            <motion.span
                                                key={`${piece ?? "empty"}-${square}-${step}`}
                                                initial={{ scale: 0.84, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.22 }}
                                                className="relative z-10 text-2xl text-paper drop-shadow-[0_0_12px_rgba(0,229,255,0.18)] sm:text-3xl md:text-4xl"
                                            >
                                                {piece ? PIECES[piece] : ""}
                                            </motion.span>
                                        </motion.div>
                                    );
                                }),
                            )}
                        </div>
                    </GlassCard>

                    <GlassCard accent="purple" className="min-h-[390px]">
                        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                                    Turno
                                </p>
                                <p className="mt-1 text-2xl font-bold">{game.turn}</p>
                            </div>
                            <div className="rounded-full border border-flash/20 bg-flash/10 px-4 py-2 font-mono text-sm text-flash">
                                {lastMove?.san ?? "start"}
                            </div>
                        </div>

                        <div
                            ref={panelRef}
                            className="mt-5 max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-sm leading-7 text-text-secondary"
                        >
                            {game.history.length === 0 ? (
                                <p>Esperando primera jugada...</p>
                            ) : (
                                game.history.map((move, index) => (
                                    <p key={`${move.san}-${index}`} className="flex justify-between gap-4">
                                        <span>
                                            {Math.floor(index / 2) + 1}
                                            {index % 2 === 0 ? "." : "..."} {move.san}
                                        </span>
                                        <span className="text-flash/70">
                                            {move.from}
                                            {move.to}
                                        </span>
                                    </p>
                                ))
                            )}
                        </div>

                        <div className="mt-5 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.04] p-4">
                            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                                FEN
                            </p>
                            <p className="mt-2 break-all font-mono text-xs leading-5 text-flash/80">
                                {game.fen}
                            </p>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
