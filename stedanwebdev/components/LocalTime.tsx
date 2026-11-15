"use client";
import { useEffect, useState } from "react";

/** Current time in Accra. Renders nothing until mounted, so there's no hydration mismatch. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Accra",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;
  return <span> · {now} GMT</span>;
}
