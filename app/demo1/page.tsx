"use client";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import AppState from "./components/appState";

export default function RootLayout({ children }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <h1 className="mb-4 text-4xl font-extrabold">Demo 1</h1>
      <CopilotSidebar>
        {children}
        <AppState children={children} />
      </CopilotSidebar>
    </CopilotKit>
  );
}
