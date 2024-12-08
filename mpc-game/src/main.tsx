import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { OktoProvider, BuildType } from "okto-sdk-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

console.log(import.meta.env.VITE_OKTO_CLIENT_API_KEY, "API KEY");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <OktoProvider
        apiKey={import.meta.env.VITE_OKTO_CLIENT_API_KEY}
        buildType={BuildType.SANDBOX}
      >
        <App />
      </OktoProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
