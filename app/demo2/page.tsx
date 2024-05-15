"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

import dynamic from "next/dynamic";

const DocumentEditor = dynamic(() => import("./components/document"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <CopilotSidebar defaultOpen={true}>
        {children}
        <DocumentEditor />
      </CopilotSidebar>
    </CopilotKit>
  );
}
