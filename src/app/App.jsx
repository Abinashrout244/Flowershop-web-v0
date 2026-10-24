// import { RouterProvider } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { router } from "./routes";
// import { restoreSession } from "../features/user/authSlice";
// import { subscribeToAuthChanges } from "../controllers/authController";

// const App = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const unsubscribe = subscribeToAuthChanges((event, user) => {
//       if (
//         event === "INITIAL_SESSION" ||
//         event === "SIGNED_IN" ||
//         event === "SIGNED_OUT" ||
//         event === "TOKEN_REFRESHED" ||
//         event === "USER_UPDATED"
//       ) {
//         dispatch(
//           restoreSession(
//             user,
//           ),
//         );
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [dispatch]);

//   return (
//     <RouterProvider router={router} future={{ v7_startTransition: true }} />
//   );
// };

// export default App;

import { RouterProvider } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { router } from "./routes";
import { restoreSession } from "../features/user/authSlice";
import { subscribeToAuthChanges } from "../controllers/authController";

import {
  loadGuestCartFromStorage,
  replaceCartItems,
  replaceCartState,
  setCartReady,
} from "../features/cart/cartSlice";

import { fetchCartItems, mergeCartItems } from "../models/cartModel";

const App = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user?.id ?? null);

  const isAuthLoading = useSelector((state) => state.auth.isLoading);

  const previousUserId = useRef(undefined);

  // Restore and track the Supabase authentication session.
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((event, user) => {
      const relevantEvents = [
        "INITIAL_SESSION",
        "SIGNED_IN",
        "SIGNED_OUT",
        "TOKEN_REFRESHED",
        "USER_UPDATED",
      ];

      if (relevantEvents.includes(event)) {
        dispatch(restoreSession(user));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  // Initialize the appropriate cart when authentication changes.
  useEffect(() => {
    if (isAuthLoading) return;

    let cancelled = false;

    const initializeCart = async () => {
      // No authenticated user: use the guest cart.
      if (!userId) {
        const wasLoggedIn = previousUserId.current != null;

        if (wasLoggedIn) {
          dispatch(setCartReady(false));

          const guestCart = loadGuestCartFromStorage();

          dispatch(replaceCartState(guestCart));
        }

        previousUserId.current = null;
        dispatch(setCartReady(true));

        return;
      }

      // Avoid reloading the same account unnecessarily.
      if (previousUserId.current === userId) {
        return;
      }

      dispatch(setCartReady(false));

      // Don't show the previous cart while loading this account.
      dispatch(replaceCartItems([]));

      const guestCart = loadGuestCartFromStorage();
      const guestItems = guestCart.items || [];

      try {
        // Merge guest items into the logged-in user's cart.
        if (guestItems.length > 0) {
          await mergeCartItems(guestItems);
        }

        if (cancelled) return;

        // Load the user's complete cart from Supabase.
        const serverItems = await fetchCartItems(userId);

        if (cancelled) return;

        // Remove local guest data only after success.
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem("flora_cart");
        }

        previousUserId.current = userId;

        dispatch(
          replaceCartState({
            ...guestCart,
            items: serverItems,
          }),
        );
      } catch (error) {
        console.error("Unable to initialize cart:", error);

        if (cancelled) return;

        // If initialization fails, keep guest storage intact.
        // Try loading the existing account cart for display.
        try {
          const serverItems = await fetchCartItems(userId);

          if (cancelled) return;

          dispatch(replaceCartItems(serverItems));
          previousUserId.current = userId;
        } catch (fetchError) {
          console.error("Unable to load the account cart:", fetchError);
        }
      } finally {
        if (!cancelled) {
          dispatch(setCartReady(true));
        }
      }
    };

    initializeCart();

    return () => {
      cancelled = true;
    };
  }, [userId, isAuthLoading, dispatch]);

  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
};

export default App;
