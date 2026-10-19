import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const redirectTo = `${window.location.origin}/#/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo },
      );

      if (error) throw error;

      setMessage(
        "If an account exists for this email, you will receive a password reset link. Please check your inbox and spam folder.",
      );
    } catch (err) {
      setError(err.message || "Unable to send the reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#100b12] px-4 py-10 text-white">
      <section className="w-full max-w-md rounded-2xl border border-pink-200/15 bg-[#19121d] p-7 shadow-2xl sm:p-9">
        <Link
          to="/login"
          className="mb-8 inline-block text-sm text-pink-300 hover:text-pink-200"
        >
          ← Back to login
        </Link>

        <div className="mb-6 text-4xl">🌸</div>

        <h1 className="text-3xl font-semibold tracking-tight">
          Forgot your password?
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          No worries! Enter your registered email address and we’ll send you a
          link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
            />
          </div>

          {message && (
            <p
              role="status"
              className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm leading-6 text-emerald-300"
            >
              {message}
            </p>
          )}

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-pink-400 px-4 py-3 font-semibold text-[#1b1019] transition hover:bg-pink-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-medium text-pink-300 hover:text-pink-200"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default ForgotPassword;
