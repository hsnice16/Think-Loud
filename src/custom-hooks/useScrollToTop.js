import { useEffect } from "react";

/**
 * useScrollToTop - hook
 *
 * @param {string} scrollWhenChange - having default
 *                              value empty string("")
 */
const useScrollToTop = (scrollWhenChange = "") => {
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    scrollTo({
      top: 0,
    });
  }, [scrollWhenChange]);
};

export { useScrollToTop };
