import { Suspense } from "react";
import useScrollToTop from "../hooks/useScrollToTop";
import PageLoader from "../components/ui/Loader/PageLoader";
import FlowerCelebration from "../components/ui/FlowerCelebration";

export const RouteShell = ({ children }) => {
  useScrollToTop();

  return (
    <>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
      <FlowerCelebration />
    </>
  );
};
