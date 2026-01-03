"use client";

import React, { useEffect, useState } from "react";

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowInstallButton(false);
    }

    setDeferredPrompt(null);
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex items-center gap-4">
        <div>
          <p className="font-semibold">App installieren</p>
          <p className="text-sm opacity-90">
            Installieren Sie diese App für Offline-Zugriff
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 font-semibold"
          >
            Installieren
          </button>
          <button
            onClick={() => setShowInstallButton(false)}
            className="px-4 py-2 hover:bg-blue-700 rounded"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

