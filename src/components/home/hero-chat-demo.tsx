"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Conversation = { user: string; noxis: string };

const CONVERSATIONS: ReadonlyArray<Conversation> = [
	{
		user: "¿Qué pasa con mi web hoy?",
		noxis:
			"He detectado 2 avisos: tu SSL caduca en 18 días y robots.txt cambió ayer a las 3:12h. ¿Te explico qué hacer primero?",
	},
	{
		user: "¿Tengo algo urgente en el correo?",
		noxis:
			"3 correos sin leer. Uno parece urgente: un cliente pregunta por presupuesto. ¿Lo resumo?",
	},
	{
		user: "Dame el resumen del día",
		noxis:
			"Web: 1 aviso pendiente. Correo: 3 nuevos. Calendario: reunión a las 16h. ¿Empezamos por lo urgente?",
	},
];

const TYPE_SPEED = 28; // ms por carácter
const USER_DELAY = 300; // aparición del mensaje USER tras el inicio
const TYPING_DELAY = 800; // typing aparece tras el USER
const TYPING_DURATION = 900; // duración del indicador typing antes de responder
const END_PAUSE = 2500; // pausa al completar la respuesta
const FADE_OUT = 400; // fade out antes de la siguiente conversación

type Phase = "idle" | "user" | "typing" | "answer";

const DOT_DELAYS = [0, 0.15, 0.3] as const;

function Avatar() {
	return (
		<span
			aria-hidden
			className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 text-xs font-semibold text-cyan-400"
		>
			N
		</span>
	);
}

function UserBubble({ text, animate }: { text: string; animate: boolean }) {
	return (
		<div className="flex justify-end">
			<motion.div
				initial={animate ? { opacity: 0, x: 12 } : false}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.3 }}
				className="max-w-[80%] rounded-2xl rounded-br-sm bg-white/10 px-4 py-2.5 text-[13px] leading-relaxed text-white/80 md:text-sm"
			>
				{text}
			</motion.div>
		</div>
	);
}

function NoxisBubble({
	children,
	animate,
}: {
	children: React.ReactNode;
	animate: boolean;
}) {
	return (
		<div className="flex items-start justify-start gap-2.5">
			<Avatar />
			<motion.div
				initial={animate ? { opacity: 0, y: 8 } : false}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="max-w-[80%] rounded-2xl rounded-bl-sm border border-cyan-400/30 bg-white/[0.03] px-4 py-2.5 text-[13px] leading-relaxed text-white md:text-sm"
			>
				{children}
			</motion.div>
		</div>
	);
}

function TypingIndicator() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="flex items-start justify-start gap-2.5"
		>
			<Avatar />
			<div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-cyan-400/30 bg-white/[0.03] px-4 py-3.5">
				{DOT_DELAYS.map((delay) => (
					<motion.span
						key={delay}
						className="h-1.5 w-1.5 rounded-full bg-cyan-400"
						animate={{ scale: [0.8, 1.2, 0.8] }}
						transition={{
							duration: 0.6,
							repeat: Number.POSITIVE_INFINITY,
							delay,
						}}
					/>
				))}
			</div>
		</motion.div>
	);
}

function Chrome({
	children,
	online,
}: {
	children: React.ReactNode;
	online: boolean;
}) {
	return (
		<div
			className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
			style={{ boxShadow: "0 20px 60px rgba(0,229,255,0.08)" }}
		>
			{/* Topbar */}
			<div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
				<div className="flex items-center gap-3">
					<div className="flex gap-1.5">
						<span className="h-3 w-3 rounded-full bg-red-400/80" />
						<span className="h-3 w-3 rounded-full bg-amber-400/80" />
						<span className="h-3 w-3 rounded-full bg-emerald-400/80" />
					</div>
					<span className="text-xs font-medium text-white/60">
						Noxis · Copiloto
					</span>
				</div>
				<span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
					<span className="relative flex h-2 w-2">
						{online && (
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
						)}
						<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
					</span>
					En línea
				</span>
			</div>

			{children}

			{/* Input falso (demo, desactivado) */}
			<div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
				<input
					type="text"
					disabled
					aria-hidden
					tabIndex={-1}
					placeholder="Escribe a Noxis..."
					className="flex-1 bg-transparent text-sm text-white/40 outline-none placeholder:text-white/30"
				/>
				<span
					aria-hidden
					className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-black"
				>
					<Send className="h-4 w-4" />
				</span>
			</div>
		</div>
	);
}

export function HeroChatDemo() {
	const reduce = useReducedMotion();
	const [index, setIndex] = useState(0);
	const [phase, setPhase] = useState<Phase>("idle");
	const [typed, setTyped] = useState("");
	const [fading, setFading] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	// Secuencia animada por conversación; se reinicia al cambiar de index.
	useEffect(() => {
		if (reduce) {
			return;
		}

		const convo = CONVERSATIONS[index];
		const timers: ReturnType<typeof setTimeout>[] = [];
		let typeInterval: ReturnType<typeof setInterval> | undefined;

		setPhase("idle");
		setTyped("");
		setFading(false);

		timers.push(setTimeout(() => setPhase("user"), USER_DELAY));
		timers.push(
			setTimeout(() => setPhase("typing"), USER_DELAY + TYPING_DELAY),
		);
		timers.push(
			setTimeout(
				() => {
					setPhase("answer");
					let i = 0;
					typeInterval = setInterval(() => {
						i += 1;
						setTyped(convo.noxis.slice(0, i));
						if (i >= convo.noxis.length) {
							if (typeInterval) {
								clearInterval(typeInterval);
							}
							timers.push(setTimeout(() => setFading(true), END_PAUSE));
							timers.push(
								setTimeout(() => {
									setIndex((prev) => (prev + 1) % CONVERSATIONS.length);
								}, END_PAUSE + FADE_OUT),
							);
						}
					}, TYPE_SPEED);
				},
				USER_DELAY + TYPING_DELAY + TYPING_DURATION,
			),
		);

		return () => {
			for (const t of timers) {
				clearTimeout(t);
			}
			if (typeInterval) {
				clearInterval(typeInterval);
			}
		};
	}, [index, reduce]);

	// Auto-scroll al fondo mientras crece la conversación.
	// typed/phase son disparadores intencionales del scroll, no se leen en el cuerpo.
	// biome-ignore lint/correctness/useExhaustiveDependencies: re-run deliberado al avanzar la conversación
	useEffect(() => {
		const el = scrollRef.current;
		if (el) {
			el.scrollTop = el.scrollHeight;
		}
	}, [typed, phase]);

	// Versión estática para prefers-reduced-motion: conversación 1, sin loop.
	if (reduce) {
		const convo = CONVERSATIONS[0];
		return (
			<Chrome online={false}>
				<div className="flex h-[240px] flex-col gap-4 overflow-y-auto p-4 md:h-[300px]">
					<UserBubble text={convo.user} animate={false} />
					<NoxisBubble animate={false}>{convo.noxis}</NoxisBubble>
				</div>
			</Chrome>
		);
	}

	const convo = CONVERSATIONS[index];

	return (
		<Chrome online={true}>
			<div
				ref={scrollRef}
				className="h-[240px] overflow-y-auto p-4 md:h-[300px]"
			>
				<motion.div
					animate={{ opacity: fading ? 0 : 1 }}
					transition={{ duration: 0.4 }}
					className="flex flex-col gap-4"
				>
					{phase !== "idle" && <UserBubble text={convo.user} animate={true} />}

					<AnimatePresence>
						{phase === "typing" && <TypingIndicator key="typing" />}
					</AnimatePresence>

					{phase === "answer" && (
						<NoxisBubble animate={true}>
							{typed}
							{typed.length < convo.noxis.length && (
								<motion.span
									aria-hidden
									className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-cyan-400"
									animate={{ opacity: [1, 0, 1] }}
									transition={{
										duration: 0.8,
										repeat: Number.POSITIVE_INFINITY,
									}}
								/>
							)}
						</NoxisBubble>
					)}
				</motion.div>
			</div>
		</Chrome>
	);
}
