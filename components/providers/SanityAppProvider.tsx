"use client";

import { SanityApp } from "@sanity/sdk-react";
import { dataset, projectId } from "@/sanity/env";

function SanityAppProvider({ children }: { children: React.ReactNode }) {
  const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

  return (
    <SanityApp
      config={[
        {
          projectId,
          dataset,
          // Use token-based auth to skip OAuth redirect flow
          ...(token && { token }),
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
