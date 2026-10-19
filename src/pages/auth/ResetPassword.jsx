import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const verifyRecovery = async () => {
      try {
        const fullHash = window.location.hash;

        // HashRouter route + Supabase recovery tokens:
        // #/reset-password#access_token=...&refresh_token=...
        const secondHashIndex = fullHash.indexOf("#", 1);

        if (secondHashIndex !== -1) {
          const authParams = new URLSearchParams(
            fullHash.slice(secondHashIndex + 1),
          );

          const accessToken = authParams.get("access_token");
          const refreshToken = authParams.get("refresh_token");
          const type = authParams.get("type");

          if (authParams.get("error")) {
            throw new Error(
              authParams.get("error_description") ||
                "Your reset link is invalid or expired.",
            );
          }

          if (type === "recovery" && accessToken && refreshToken) {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error) throw error;

            // Remove tokens from the visible URL.
            window.history.replaceState(
              {},
              document.title,
              `${window.location.pathname}${window.location.search}#/reset-password`,
            );
          }
        }

        // Also support PKCE recovery links.
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);

          if (error) throw error;

          url.searchParams.delete("code");
          window.history.replaceState({}, document.title, url.toString());
        }

        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (!data.session) {
          throw new Error(
            "Your reset link is invalid or expired. Please request a new one.",
          );
        }

        if (active) setReady(true);
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to verify your reset link.");
        }
      }
    };

    verifyRecovery();

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setMessage("Your password has been updated successfully.");
      setPassword("");
      setConfirmPassword("");

      await supabase.auth.signOut();

      setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (err) {
      setError(err.message || "Unable to update your password.");
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

        <div className="mb-6 text-4xl">🌷</div>

        <h1 className="text-3xl font-semibold tracking-tight">
          Reset your password
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          Choose a new password for your FlowerShop account.
        </p>

        {!ready && !error && (
          <p role="status" className="mt-6 text-sm text-gray-300">
            Verifying your secure reset link...
          </p>
        )}

        {ready && (
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                New password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Confirm new password
              </label>

              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-pink-400 px-4 py-3 font-semibold text-[#1b1019] transition hover:bg-pink-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}

        {message && (
          <p role="status" className="mt-5 text-sm text-emerald-300">
            {message}
          </p>
        )}

        {error && (
          <div className="mt-6 space-y-3">
            <p role="alert" className="text-sm leading-6 text-red-300">
              {error}
            </p>

            <Link
              to="/forgot-password"
              className="inline-block text-sm text-pink-300 hover:text-pink-200"
            >
              Request a new reset link
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default ResetPassword;
