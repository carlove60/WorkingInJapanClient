import * as React from "react";

export function usePolling(callback: () => void, enabled: boolean) {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    callback(); // run once
    const id = setInterval(callback, 1000);
    return () => clearInterval(id);
  }, [callback, enabled]); // ✅ Clean deps
}
