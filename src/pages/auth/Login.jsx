import { useEffect, useState } from "react";
import {
  FALLING_FLOWERS,
  PANEL_TEXT,
  PASSWORD_RULES,
  range,
  inputClass,
} from "./authConfig";
import { Link } from "react-router-dom";

import { Field } from "./Field";
import { PasswordField } from "./PasswordField";
import { PasswordChecklist } from "./PasswordChecklist";
import BackButton from "./BackButton";
import { PanelImage } from "./PanelImage";
import { SvgDefs } from "./SvgDefs";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSucess, signupSucess } from "../../features/user/authSlice";
import { loginUser, registerUser } from "../../controllers/authController";

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [name, setName] = useState("");
  const [loginEmail, setLoginEmail] = useState("abinashrout.mail@gmail.com");
  const [loginPassword, setLoginPassword] = useState("Abinash@1231");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [err, setError] = useState("");

  const isLogin = mode === "login";

  const results = PASSWORD_RULES.map((rule) => rule.test(signupPassword));
  const allRulesPassed = results.every(Boolean);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setError(" ");
    setIsSubmitting(true);
    setSuccessMessage(" ");
    try {
      const user = await loginUser({
        email: loginEmail.trim(),
        password: loginPassword,
      });
      dispatch(loginSucess(user));

      navigate(location.state?.from?.pathname || "/shop", {
        replace: true,
        state: { celebration: "Welcome to Bloom!" },
      });
      event.currentTarget.reset();
      setLoginPassword("");
    } catch (error) {
      setError(error.message || "Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const onbck = () => {
    navigate("/");
  };

  async function handleSignup(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!allRulesPassed) return;

    if (!name.trim() || !signupEmail.trim()) {
      setError("Please enter your name and email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { user, needsEmailConfirmation } = await registerUser({
        email: signupEmail.trim(),
        password: signupPassword,
        options: {
          data: {
            full_name: name.trim(),
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (user) {
        dispatch(signupSucess(user));

        navigate(location.state?.from?.pathname || "/shop", {
          replace: true,
          state: { celebration: "Welcome to Bloom!" },
        });
      } else if (needsEmailConfirmation) {
        setSuccessMessage(
          "Account created! Please check your email to confirm your account.",
        );
        setMode("login");
        setLoginEmail(signupEmail.trim());
        setSignupPassword("");
        setName("");
        setSignupEmail("");
      }
    } catch (error) {
      setError(error.message || "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 pb-8 pt-20 font-sans md:py-8">
      <SvgDefs />
      <BackButton onClick={onbck} />

      {/* blurred glows on the black background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-700/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-rose-500/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/15 blur-3xl" />
      </div>

      <main className="relative z-10 w-full max-w-[820px] overflow-hidden rounded-3xl bg-[#faf7f2] shadow-2xl shadow-emerald-950/40 md:h-[650px]">
        <div className="relative h-32 overflow-hidden md:hidden">
          <PanelImage isLogin={isLogin} />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-6 text-center text-stone-50">
            <h2 className="font-serif text-2xl">{PANEL_TEXT[mode].title}</h2>
          </div>
        </div>

        {/* ---------- LOGIN FORM (left side) ---------- */}
        <section
          className={`flex-col justify-center p-8 transition-opacity duration-500 sm:p-10 md:absolute md:inset-y-0 md:left-0 md:w-1/2 md:p-10 ${
            isLogin
              ? "flex"
              : "hidden md:flex md:pointer-events-none md:opacity-0"
          }`}
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500">
            Welcome to Bloom
          </p>
          <h1 className="mt-2 font-serif text-3xl text-stone-900">Log in</h1>
          <p className="mt-2 text-sm text-stone-600">
            Good to see you again. Your flowers missed you.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <Field
              label="Email"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setLoginEmail(e.target.value)}
              value={loginEmail}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-800">
                Password
              </label>
              <PasswordField
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <Link
                to="/forgot-password"
                className="mt-2 block text-right text-xs text-stone-500 hover:text-stone-900"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-stone-900 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition hover:bg-stone-800 active:scale-95"
            >
              {isSubmitting ? "Loading" : "Log in"}
            </button>
          </form>

          {err && (
            <p className="font-semibold text-red-500 p-2 text-wrap text-center">
              {err}
            </p>
          )}
          {successMessage && (
            <p className="font-semibold text-red-500 p-2 text-wrap text-center">
              {successMessage}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-stone-600">
            New here?
            <button
              onClick={() => setMode("signup")}
              className="font-semibold text-stone-900 underline-offset-4 hover:underline"
            >
              Create an account
            </button>
          </p>
        </section>

        {/* ---------- SIGNUP FORM (right side) ---------- */}
        <section
          className={`flex-col justify-center p-8 transition-opacity duration-500 sm:p-10 md:absolute md:inset-y-0 md:left-1/2 md:w-1/2 md:overflow-y-auto md:p-8 ${
            !isLogin
              ? "flex"
              : "hidden md:flex md:pointer-events-none md:opacity-0"
          }`}
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500">
            Welcome to Bloom
          </p>
          <h1 className="mt-2 font-serif text-3xl text-stone-900">
            Create account
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Join us and start collecting your favorites.
          </p>

          <form onSubmit={handleSignup} className="mt-5 space-y-3">
            <Field
              label="Full name"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Field
              label="Email"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setSignupEmail(e.target.value)}
              value={signupEmail}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-800">
                Password
              </label>
              <PasswordField
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Create a password"
              />
              <PasswordChecklist results={results} />
            </div>

            <button
              type="submit"
              disabled={!allRulesPassed || isSubmitting}
              className="w-full rounded-xl bg-stone-900 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition hover:bg-stone-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
            >
              {isSubmitting ? "Loading" : "Sign up"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-stone-600">
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="font-semibold text-stone-900 underline-offset-4 hover:underline"
            >
              Log in
            </button>
          </p>
        </section>

        {/* ---------- SLIDING IMAGE PANEL ---------- */}

        <aside
          className={`absolute inset-y-0 left-1/2 z-10 hidden w-1/2 overflow-hidden bg-stone-950 ring-1 ring-inset ring-white/10 transition-transform duration-700 ease-in-out md:block ${
            isLogin ? "" : "-translate-x-full"
          }`}
        >
          <PanelImage isLogin={isLogin} />

          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent" />

          {["login", "signup"].map((key) => (
            <div
              key={key}
              className={`absolute inset-x-0 top-0 p-9 text-stone-50 transition-opacity duration-500 ${
                mode === key ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-300">
                {PANEL_TEXT[key].eyebrow}
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-tight">
                {PANEL_TEXT[key].title}
              </h2>
              <p className="mt-2 text-sm text-stone-300">
                {PANEL_TEXT[key].subtitle}
              </p>
            </div>
          ))}
        </aside>
      </main>
    </div>
  );
}
