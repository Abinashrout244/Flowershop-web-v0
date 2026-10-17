import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { router } from "./routes";
import { restoreSession } from "../features/user/authSlice";
import { supabse } from "../lib/supabaseClient";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const {
      data: { subscription },
    } = supabse.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (
        event === "INITIAL_SESSION" ||
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED"
      ) {
        dispatch(
          restoreSession(
            session?.user
              ? {
                  id: session.user.id,
                  email: session.user.email,
                  name: session.user.user_metadata?.full_name,
                }
              : null,
          ),
        );
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
};

export default App;
