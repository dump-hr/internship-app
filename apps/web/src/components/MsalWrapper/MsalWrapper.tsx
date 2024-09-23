import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../../configs/auth";
import { MsalProvider } from "@azure/msal-react";
import { ReactNode } from "react";

const msalInstance = new PublicClientApplication(msalConfig);

export const MsalWrapper = ({ children }: { children: ReactNode }) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};
