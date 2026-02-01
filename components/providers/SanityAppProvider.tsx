"use client";

import { useMemo } from "react";
import { SanityApp } from "@sanity/sdk-react";
import { dataset, projectId } from "@/sanity/env";

function SanityAppProvider({ children }: { children: React.ReactNode }) {
  // Determine the origin for auth redirect (client-side only)
  const origin = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    // Fallback for server-side
    return process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";
  }, []);

  return (
    <SanityApp
      config={[
        {
          projectId,
          dataset,
          auth: {
            // Configure OAuth redirect to return to /admin after login
            redirectUrl: `${origin}/admin`,
          } as any,
        },
      ]}
      // We handle the loading state in the Providers component by showing a loading indicator via the dynamic import
      fallback={<div />}
    >
      {children}
    </SanityApp>
  );
}

export default SanityAppProvider;
