import { LoginArt } from "./LoginArt ";
import { SignupArt } from "./SignupArt";

export function PanelImage({ isLogin }) {
  return (
    <>
      <div
        className={`absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 transition-opacity duration-700 ${
          isLogin ? "opacity-100" : "opacity-0"
        }`}
      >
        <LoginArt />
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-br from-rose-950 via-rose-900 to-stone-900 transition-opacity duration-700 ${
          isLogin ? "opacity-0" : "opacity-100"
        }`}
      >
        <SignupArt />
      </div>
    </>
  );
}
