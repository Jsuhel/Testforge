"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type Status = "idle" | "sending" | "success";
type FieldName = "name" | "email" | "mobile" | "remarks";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

function validate(values: { name: string; email: string; mobile: string }): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That email doesn't look right.";
  const digits = (values.mobile.match(/\d/g) ?? []).length;
  if (!PHONE_RE.test(values.mobile.trim()) || digits < 7)
    errors.mobile = "Enter a valid mobile number.";
  return errors;
}

export default function FeedbackForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [firstName, setFirstName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shake = useAnimationControls();
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      };

  function clearError(field: FieldName) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function triggerShake() {
    if (reduce) return;
    shake.start({
      x: [0, -9, 9, -6, 6, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  }

  /* Cursor spotlight — CSS vars on the card, no re-render per pixel */
  function trackCursor(event: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      mobile: String(data.get("mobile") ?? ""),
      remarks: String(data.get("remarks") ?? ""),
    };

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      triggerShake();
      return;
    }

    setErrors({});
    setServerError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong.");
      }
      setFirstName(values.name.trim().split(/\s+/)[0]);
      setStatus("success");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
      setStatus("idle");
      triggerShake();
    }
  }

  function reset() {
    formRef.current?.reset();
    setErrors({});
    setServerError("");
    setStatus("idle");
  }

  const statusText =
    status === "sending"
      ? "Sending your feedback…"
      : status === "success"
        ? "Feedback saved. Thank you!"
        : "";

  return (
    <div className="relative max-w-2xl">
      {/* Ambient pulsing glow behind the card */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-2xl"
        style={{
          background:
            "radial-gradient(420px circle at 30% 0%, rgba(228, 87, 46, 0.16), transparent 65%)",
        }}
        animate={reduce ? undefined : { opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Card with border beam + cursor spotlight */}
      <motion.div
        ref={cardRef}
        onMouseMove={trackCursor}
        className="beam-card relative rounded-xl border border-[#eef0ee26] bg-[#ffffff0a] p-5 backdrop-blur-sm sm:p-7"
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      >
        <span
          aria-hidden="true"
          className="dots-overlay pointer-events-none absolute inset-0 rounded-xl"
        />
        <span
          aria-hidden="true"
          className="spotlight-overlay pointer-events-none absolute inset-0 rounded-xl"
        />

        <div className="relative">
          <h3 className="font-display text-xl font-bold">Share your feedback</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#9aa3ad]">
            Spotted something off, or want a quick walkthrough? Leave a note — it
            goes straight to our team.
          </p>

          <p aria-live="polite" className="sr-only">
            {statusText}
          </p>

          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.div
                key="done"
                className="flex flex-col items-start gap-4 py-8"
                initial={reduce ? false : { opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <motion.svg
                  viewBox="0 0 52 52"
                  className="h-14 w-14"
                  aria-hidden="true"
                >
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M15 27l7 7 15-16"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, delay: 0.4, ease: "easeOut" }}
                  />
                </motion.svg>
                <div>
                  <p className="font-display text-2xl font-bold">
                    Thanks{firstName ? `, ${firstName}` : ""}!
                  </p>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-[#9aa3ad]">
                    Your feedback is saved. We usually reply within one working
                    day.
                  </p>
                  <span className="chip mt-3 text-[#9aa3ad]">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[#4cbf86]"
                      aria-hidden="true"
                    />
                    Saved to the team sheet
                  </span>
                </div>
                <button type="button" onClick={reset} className="btn btn-ghost">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="mt-5"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                exit={{ opacity: 0, y: -8 }}
              >
                {/* Shake target — animated separately so field state survives */}
                <motion.div animate={shake} className="grid gap-4 sm:grid-cols-2">
                  <motion.div variants={item}>
                    <div className="field">
                      <input
                        id="fb-name"
                        name="name"
                        type="text"
                        placeholder=" "
                        autoComplete="name"
                        maxLength={80}
                        aria-invalid={Boolean(errors.name)}
                        onChange={() => clearError("name")}
                      />
                      <label htmlFor="fb-name">Your name</label>
                    </div>
                    <FieldError message={errors.name} />
                  </motion.div>

                  <motion.div variants={item}>
                    <div className="field">
                      <input
                        id="fb-email"
                        name="email"
                        type="email"
                        placeholder=" "
                        autoComplete="email"
                        maxLength={120}
                        aria-invalid={Boolean(errors.email)}
                        onChange={() => clearError("email")}
                      />
                      <label htmlFor="fb-email">Email address</label>
                    </div>
                    <FieldError message={errors.email} />
                  </motion.div>

                  <motion.div variants={item} className="sm:col-span-2">
                    <div className="field">
                      <input
                        id="fb-mobile"
                        name="mobile"
                        type="tel"
                        placeholder=" "
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={20}
                        aria-invalid={Boolean(errors.mobile)}
                        onChange={() => clearError("mobile")}
                      />
                      <label htmlFor="fb-mobile">Mobile number</label>
                    </div>
                    <FieldError message={errors.mobile} />
                  </motion.div>

                  <motion.div variants={item} className="sm:col-span-2">
                    <div className="field">
                      <textarea
                        id="fb-remarks"
                        name="remarks"
                        placeholder=" "
                        rows={4}
                        maxLength={1000}
                        onChange={() => clearError("remarks")}
                      />
                      <label htmlFor="fb-remarks">
                        Remarks — feedback, or ask for a meeting
                      </label>
                    </div>
                    <FieldError message={errors.remarks} />
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={item}
                  className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    className="btn btn-accent btn-shine w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {status === "sending" ? (
                        <motion.span
                          key="sending"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                        >
                          <span
                            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                            aria-hidden="true"
                          />
                          Sending…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                        >
                          Send feedback
                          <motion.svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                            animate={reduce ? undefined : { x: [0, 4, 0] }}
                            transition={{
                              duration: 1.6,
                              repeat: Infinity,
                              ease: "easeInOut",
                              repeatDelay: 0.8,
                            }}
                          >
                            <path
                              d="M4 12h15M13 6l6 6-6 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </motion.svg>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  <p className="text-xs text-[#9aa3ad]">
                    Saved to our records — no spam, ever.
                  </p>
                </motion.div>

                <AnimatePresence>
                  {serverError && (
                    <motion.p
                      key="server-error"
                      role="alert"
                      className="mt-4 rounded-lg border border-[#ef7b6b40] bg-[#ef7b6b14] px-4 py-3 text-sm text-[#ef7b6b]"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                    >
                      {serverError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          role="alert"
          className="mt-1.5 text-xs text-[#ef7b6b]"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
