"use client";
import "./globals.css";
import { HuddleClient, HuddleProvider } from "@huddle01/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const huddleClient = new HuddleClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  });

  return (
    <html lang="en">
      <HuddleProvider client={huddleClient}>
        <body>{children}</body>
      </HuddleProvider>
    </html>
  );
}
