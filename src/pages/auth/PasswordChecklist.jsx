import { PASSWORD_RULES } from "./authConfig";

export function PasswordChecklist({ results }) {
  const passedCount = results.filter(Boolean).length;

  let barColor = "bg-red-400";

  if (passedCount > 3) barColor = "bg-amber-400";

  if (passedCount === PASSWORD_RULES.length) {
    barColor = "bg-emerald-500";
  }

  return (
    <div className="mt-3">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{
            width: `${(passedCount / PASSWORD_RULES.length) * 100}%`,
          }}
        />
      </div>

      <ul className="mt-3 grid grid-cols-1 gap-x-3 gap-y-1.5 sm:grid-cols-2">
        {PASSWORD_RULES.map((rule, index) => {
          const passed = results[index];

          return (
            <li
              key={rule.label}
              className={`flex items-center gap-2 text-xs ${
                passed ? "text-emerald-700" : "text-stone-400"
              }`}
            >
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] text-white ${
                  passed ? "bg-emerald-500" : "bg-stone-300"
                }`}
              >
                {passed ? "✓" : ""}
              </span>

              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
