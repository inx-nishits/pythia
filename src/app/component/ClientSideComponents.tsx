"use client";

import dynamic from "next/dynamic";

const DemoPopup = dynamic(() => import("../containers/DemoPopup/DemoPopup"), { ssr: false });
const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });

export default function ClientSideComponents() {
  return (
    <>
      <DemoPopup />
      <ChatBot />
    </>
  );
}
