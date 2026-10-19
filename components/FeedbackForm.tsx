"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { supabase, supabaseEnabled } from "@/lib/supabase";


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
  const [fileLabel, setFileLabel] = useState("");
  const [fileError, setFileError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
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

  const MAX_FILE_MB = 5;

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const file = input.files?.[0];
    setFileError("");
    if (!file) {
      setFileLabel("");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`That file is ${formatSize(file.size)} — please keep it under ${MAX_FILE_MB} MB.`);
      input.value = "";
      setFileLabel("");
      return;
    }
    setFileLabel(`${file.name} · ${formatSize(file.size)}`);
  }

  function triggerShake() {
    if (reduce) return;
    shake.start({
      x: [0, -9, 9, -6, 6, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
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
    if (fileError) {
      triggerShake();
      return;
    }

    setErrors({});
    setServerError("");
    setStatus("sending");

    const file = data.get("document");

    // Primary path: Supabase (database row + document in storage).
    if (supabaseEnabled) {
      try {
        let documentPath = "";
        if (file instanceof File && file.size > 0) {
          const ext = (file.name.match(/\.[a-z0-9]+$/i) ?? [".dat"])[0];
          documentPath = `demo/${crypto.randomUUID()}${ext}`;
          const { error: upErr } = await supabase.storage
            .from("documents")
            .upload(documentPath, file, { contentType: file.type || undefined });
          if (upErr) throw new Error(upErr.message);
        }
        const { error: insErr } = await supabase.from("demo_requests").insert({
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          remarks: values.remarks,
          document_path: documentPath || null,
        });
        if (insErr) throw new Error(insErr.message);
        setFirstName(values.name.trim().split(/\s+/)[0]);
        setStatus("success");
        return;
      } catch (err) {
        setServerError(
          err instanceof Error ? err.message : "Something went wrong.",
        );
        setStatus("idle");
        triggerShake();
        return;
      }
    }

    // Fallback path: the API route (Apps Script sheet + Drive).
    const payload = new FormData();
    payload.append("name", values.name);
    payload.append("email", values.email);
    payload.append("mobile", values.mobile);
    payload.append("remarks", values.remarks);
    if (file instanceof File && file.size > 0) payload.append("document", file);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: payload,
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
    setFileLabel("");
    setFileError("");
    setStatus("idle");
  }

  const statusText =
    status === "sending"
      ? "Sending your request…"
      : status === "success"
        ? "Demo request received."
        : "";

  return (
    <div className="relative max-w-2xl">
      {/* Solid, no-frills contact card */}
      <motion.div
        className="relative rounded-xl border border-[#eef0ee1f] bg-[#141a21] p-5 sm:p-6"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      >
        <div className="relative">
          <h3 className="font-display text-xl font-medium">Request a demo</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#9aa3ad]">
            Bring a real requirements document — watch TestForge.Ai analyse
            it, chat through it, and draft the suite live.
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
                  <p className="font-display text-2xl font-medium">
                    Thanks{firstName ? `, ${firstName}` : ""}!
                  </p>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-[#9aa3ad]">
                    Your demo request is in. We&apos;ll confirm a slot within
                    one working day.
                  </p>
                  <span className="chip mt-3 text-[#9aa3ad]">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[#4cbf86]"
                      aria-hidden="true"
                    />
                    Request received
                  </span>
                </div>
                <button type="button" onClick={reset} className="btn btn-ghost">
                  Send another request
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
                        rows={3}
                        maxLength={1000}
                        onChange={() => clearError("remarks")}
                      />
                      <label htmlFor="fb-remarks">
                        What should the demo cover? (optional)
                      </label>
                    </div>
                    <FieldError message={errors.remarks} />
                  </motion.div>

                  <motion.div variants={item} className="sm:col-span-2">
                    <div className="rounded-lg border border-dashed border-[#eef0ee33] px-4 py-3.5 transition-colors hover:border-[#eef0ee55]">
                      <input
                        id="fb-document"
                        name="document"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx,.md,.txt"
                        onChange={onFileChange}
                      />
                      <label
                        htmlFor="fb-document"
                        className="flex cursor-pointer items-center gap-3 text-sm text-[#9aa3ad] transition-colors hover:text-paper"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          className="shrink-0"
                        >
                          <path
                            d="M21.4 11.1 12.3 20a5 5 0 0 1-7.1-7.1l8.5-8.4a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.4a1.7 1.7 0 0 1-2.4-2.4l7.8-7.7"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {fileLabel ? (
                          <span className="min-w-0 truncate text-paper">{fileLabel}</span>
                        ) : (
                          <span>
                            Attach your requirements document — PDF, DOCX or MD,
                            up to {MAX_FILE_MB} MB (optional)
                          </span>
                        )}
                      </label>
                    </div>
                    <FieldError message={fileError} />
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
                          Request a demo
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
                    A calendar invite and nothing else — no spam.
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
