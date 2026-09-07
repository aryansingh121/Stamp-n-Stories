import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Instagram, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function InstagramQR({ handle }: { handle: string | null | undefined }) {
  const [qr, setQr] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const clean = (handle || "")
    .trim()
    .replace(/^@/, "")
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/\/+$/, "");
  const url = clean ? `https://instagram.com/${clean}` : "";

  useEffect(() => {
    if (!url) return;
    QRCode.toDataURL(url, {
      margin: 1,
      width: 260,
      color: { dark: "#1A1A1A", light: "#FFF4E6" },
    })
      .then(setQr)
      .catch(() => {});
  }, [url]);

  if (!clean) return null;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Instagram link copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Copy failed");
    }
  }

  return (
    <div className="mx-auto w-full max-w-[420px] rounded-[1.75rem] border border-ink/10 bg-card/95 p-4 text-center shadow-card sm:max-w-[480px] sm:p-5">
      <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-3 py-1 text-[10px] font-display uppercase tracking-widest text-white">
        <Instagram className="h-3 w-3" /> Scan my Instagram
      </div>
      <div className="mx-auto mt-4 w-fit rounded-2xl border-2 border-ink/15 bg-paper p-3">
        {qr ? (
          <img src={qr} alt={`Instagram QR for @${clean}`} className="h-40 w-40 sm:h-48 sm:w-48" />
        ) : (
          <div className="h-40 w-40 animate-pulse rounded-md bg-muted sm:h-48 sm:w-48" />
        )}
      </div>
      <div className="mt-3 font-display text-lg">@{clean}</div>
      <p className="mt-1 text-xs text-ink/60">Point your camera to follow instantly.</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs text-paper transition-colors hover:bg-coral"
        >
          <Instagram className="h-3.5 w-3.5" /> Open profile
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/25 px-3 py-1.5 text-xs hover:bg-muted"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
