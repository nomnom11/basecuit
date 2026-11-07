"use client";

import { useState } from "react";

const contractAddress = "0xcff20685615f4d165a553b8a3128653984f3442e";
const openLaunchUrl =
  "https://openlaunch.lol/t/base/0xcff20685615f4d165a553b8a3128653984f3442e";

export default function TokenInfo() {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="token-card">
      <span>TOKEN NAME</span>
      <strong>BASECUIT</strong>

      <span>NETWORK</span>
      <strong>BASE</strong>

      <div className="token-address">
        <span>OFFICIAL CONTRACT ADDRESS</span>
        <code>{contractAddress}</code>
        <button type="button" onClick={copyAddress} className="copy-ca-button">
          {copied ? "✓ COPIED!" : "COPY CONTRACT ADDRESS"}
        </button>
      </div>

      <a
        href={openLaunchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="buy-openlaunch-button"
      >
        BUY $BASECUIT ON OPENLAUNCH ↗
      </a>
    </div>
  );
}
