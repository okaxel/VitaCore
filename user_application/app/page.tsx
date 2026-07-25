'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { IDKitRequestWidget, selfieCheckLegacy } from "@worldcoin/idkit";
import { getActionId, getAppId, getRpId, getSignerKey } from "../tools/env_tools";
import { getSignData } from "../tools/world_tools";

const preset = selfieCheckLegacy();
const currentSign = getSignData();

export default function Home() {

  const [authStatus, setAuthStatus] = useState('Not verified');
  const [userId, setUserId] = useState(null);
  const APP_ID = getAppId();
  const ACTION_NAME = getActionId();

  const handleSuccess = async (result) => {

    setAuthStatus('Verifying with backend...');

    // Send the proof payload to your backend API
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        proof: result,
        action: ACTION_NAME,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setAuthStatus('Verified Successfully!');
      setUserId(data.userId); // This is your unique persistent user ID
    } else {
      setAuthStatus('Backend verification failed.');
    }
  };

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>World ID Selfie Check Demo</h1>
      <p>Status: <strong>{authStatus}</strong></p>
      {userId && <p>Unique User ID (Nullifier): <code>{userId}</code></p>}

      <IDKitRequestWidget
        open={open}
        onOpenChange={setOpen}
        app_id="app_xxxxx"
        action="my-action"
        rp_context={rpContext}
        allow_legacy_proofs={true}
        preset={preset}
        handleVerify={handleVerify}
        onSuccess={(result) => { /* ... */ }}
      />;

      <IDKitWidget
        app_id={APP_ID}
        action={ACTION_NAME}
        preset={selfieCheckLegacy()} // Enforces the camera Selfie Check flow
        onSuccess={handleSuccess}
        onError={(error) => console.error('IDKit Error:', error)}
      >
        {({ open }) => (
          <button 
            onClick={open} 
            style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer' }}
          >
            Verify with Selfie Check
          </button>
        )}
      </IDKitWidget>
    </main>
  );
}



export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>To get started, edit the page.tsx file.</h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className={styles.secondary}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
