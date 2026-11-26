"use client";

import { useActionState } from "react";

import { login, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    login,
    undefined,
  );

  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block">
        <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-paper-300 uppercase">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 block w-full rounded border border-white/15 bg-ink-900 px-4 py-3 text-paper-50 outline-none focus:border-azure-500"
        />
      </label>
      {state?.error ? (
        <p role="alert" className="text-[0.9375rem] text-flame-400">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded bg-flame-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-flame-500 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
