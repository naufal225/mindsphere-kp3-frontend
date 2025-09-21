"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LOGIN_ENDPOINT,
  REMEMBER_EMAIL_KEY,
  TOKEN_STORAGE_KEY,
} from "../lib/auth";

type AuthStatus = "idle" | "loading" | "success" | "error";

type LoginResponse = {
  token: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [message, setMessage] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [year, setYear] = useState<number>();
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const storedEmail = window.localStorage.getItem(REMEMBER_EMAIL_KEY);
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
      if (emailInputRef.current) {
        emailInputRef.current.value = storedEmail;
      }
    }

    // Capture browser auto-fill after hydration so controlled state stays in sync.
    requestAnimationFrame(() => {
      if (!storedEmail && emailInputRef.current?.value) {
        setEmail(emailInputRef.current.value);
      }
      if (passwordInputRef.current?.value) {
        setPassword(passwordInputRef.current.value);
      }
    });
  }, []);

  const statusStyles = useMemo(() => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700 border border-green-200";
      case "error":
        return "bg-red-100 text-red-600 border border-red-200";
      case "loading":
        return "bg-secondary-gradient text-white";
      default:
        return "bg-transparent";
    }
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Authenticating with Mindsphere...");

    const payload: LoginPayload = { email, password };

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "Unable to sign in. Please try again.";
        try {
          const errorPayload = (await response.json()) as { message?: string };
          if (errorPayload.message) {
            errorMessage = errorPayload.message;
          }
        } catch {
          // ignore JSON parse errors and keep default message
        }
        throw new Error(errorMessage);
      }

      const data = (await response.json()) as LoginResponse;

      if (!data.token) {
        throw new Error(
          "Unexpected response from server. Please contact support."
        );
      }

      window.localStorage.setItem(TOKEN_STORAGE_KEY, data.token);

      if (rememberMe) {
        window.localStorage.setItem(REMEMBER_EMAIL_KEY, email);
      } else {
        window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }

      setStatus("success");
      setMessage("Login successful! Redirecting to dashboard...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (error) {
      const fallback = error instanceof Error ? error.message : "Login failed";
      setStatus("error");
      setMessage(fallback);
    }
  }

  const isLoading = status === "loading";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-90 bg-primary-gradient" />
        <div className="absolute -top-48 -right-32 h-96 w-96 rounded-full bg-secondary-gradient blur-3xl opacity-60" />
        <div className="absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-accent-gradient blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 sm:px-12">
        <form
          onSubmit={handleSubmit}
          className="card-glass w-full max-w-lg space-y-8 border border-white/40 px-8 py-10 shadow-xl sm:px-12"
        >
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full bg-indigo-100 px-4 py-1 text-xs font-medium uppercase tracking-[0.35em] text-indigo-800 shadow-sm">
              Platform
            </span>
            <h1 className="mt-4 text-3xl font-bold text-indigo-900">
              Mindsphere
            </h1>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-600"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                ref={emailInputRef}
                suppressHydrationWarning
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring focus:ring-indigo-100"
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                ref={passwordInputRef}
                suppressHydrationWarning
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring focus:ring-indigo-100"
                placeholder="********"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-400"
              />
              Remember me
            </label>
            <a
              className="text-sm font-medium text-indigo-500 transition hover:text-indigo-600"
              href="#"
            >
              Forgot password?
            </a>
          </div>

          <button
            suppressHydrationWarning
            type="submit"
            disabled={isLoading}
            className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-primary-gradient px-5 py-3 text-base font-semibold text-white transition focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-75`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>

          {status !== "idle" && (
            <div
              className={`rounded-xl px-4 py-3 text-sm transition ${statusStyles}`}
            >
              {message}
            </div>
          )}
        </form>

        <footer className="mt-12 text-center text-xs text-white/80">
          Mindsphere (c) {year} - Secure Industrial Intelligence
        </footer>
      </div>
    </div>
  );
}
