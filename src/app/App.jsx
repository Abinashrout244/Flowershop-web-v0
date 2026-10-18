import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { router } from "./routes";
import { restoreSession } from "../features/user/authSlice";
import { subscribeToAuthChanges } from "../controllers/authController";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((event, user) => {
      if (
        event === "INITIAL_SESSION" ||
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED"
      ) {
        dispatch(
          restoreSession(
            user,
          ),
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
};

export default App;
