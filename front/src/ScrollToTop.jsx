import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true }); // Force instant scroll
    } else {
      window.scrollTo(0, 0); // Fallback
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;