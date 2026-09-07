import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Plane, Stamp, BadgeCheck, Sparkles } from "lucide-react";
import { passportLevel, travelPersonality, vibeTags, icebreakerFor } from "@/lib/passport";
import { signedPhotoUrl } from "@/lib/photo";

export type PassportData = {
  id: string;
  traveller_code: string;
  full_name: string | null;
  age: number | null;
  city: string | null;
  interests: string[];
  cant_stop_doing: string | null;
  instagram: string | null;
  travel_vibe: string | null;
  photo_url: string | null;
  status: string;
  issued_at: string;
  stamps: Array<{ event: string; emoji?: string; date?: string }>;
};

const FALLBACK_PHOTO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 240'><rect width='100%' height='100%' fill='%23FFE9D9'/><circle cx='100' cy='95' r='38' fill='%23FF6B5B'/><rect x='40' y='140' width='120' height='100' rx='40' fill='%23FF6B5B'/></svg>`,
  );

export function PassportCard({
  data,
  shareUrl,
  printable = false,
}: {
  data: PassportData;
  shareUrl: string;
  printable?: boolean;
}) {
  const [qr, setQr] = useState<string>("");
  const [photo, setPhoto] = useState<string>(FALLBACK_PHOTO);
  const ref = useRef<HTMLDivElement>(null);

  const level = passportLevel(data);
  const personality = travelPersonality(data);
  const tags = vibeTags(data.interests);
  const icebreaker = icebreakerFor(data.id);

  useEffect(() => {
    QRCode.toDataURL(shareUrl, {
      margin: 1,
      width: 220,
      color: { dark: "#1A1A1A", light: "#FFF4E6" },
    })
      .then(setQr)
      .catch(() => {});
  }, [shareUrl]);

  useEffect(() => {
    let alive = true;
    if (data.photo_url) {
      // photo_url may be a storage path OR already a full URL
      if (/^https?:\/\//.test(data.photo_url)) {
        setPhoto(data.photo_url);
      } else {
        signedPhotoUrl(data.photo_url).then((u) => alive && u && setPhoto(u));
      }
    }
    return () => {
      alive = false;
    };
  }, [data.photo_url]);

  const issued = new Date(data.issued_at).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const slots = [...data.stamps.slice(0, 6)];
  while (slots.length < 6) slots.push({ event: "" });

  return (
    <div
      ref={ref}
      data-passport-root
      className={`relative mx-auto ${printable ? "w-[1080px]" : "w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[520px]"} aspect-[9/16] paper-texture paper-edge guilloche rounded-[2rem] overflow-hidden text-ink`}
    >
      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="flex items-center gap-2">
          <Plane className="h-4 w-4 text-coral" />
          <span className="font-display text-[10px] uppercase tracking-[0.22em] sm:text-[11px]">
            Stamp &amp; Stories
          </span>
        </div>
        <span className="font-display text-[10px] uppercase tracking-[0.22em] text-ink/60 sm:text-[11px]">
          Community Passport
        </span>
      </div>

      {/* Diagonal "ISSUED" stamp */}
      <div className="stamp-ring stamp-ring--tilt stamp-fade absolute right-4 top-16 rounded-full px-3 py-1 text-[9px] sm:right-5 sm:top-20 sm:text-[10px]">
        Issued · {issued}
      </div>

      <div className="absolute inset-0 flex flex-col px-4 pb-4 pt-14 sm:px-6 sm:pt-16 sm:pb-6">
        {/* Photo + identity */}
        <div className="flex gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <div className="h-28 w-22 overflow-hidden rounded-md border-2 border-ink/80 shadow-md sm:h-32 sm:w-24 lg:h-36 lg:w-28">
              <img src={photo} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 rounded-full bg-coral px-2 py-0.5 text-[9px] font-display uppercase tracking-widest text-primary-foreground shadow-md">
              Lv {level.tier}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[9px] uppercase tracking-[0.2em] text-ink/60 sm:text-[10px]">
              Name
            </div>
            <div className="font-display text-lg leading-tight sm:text-xl lg:text-[1.35rem]">
              {data.full_name || "Unnamed Member"}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] sm:text-[11px]">
              <div>
                <div className="text-[8px] uppercase tracking-widest text-ink/50 sm:text-[9px]">
                  City
                </div>
                <div className="truncate font-medium">{data.city || "—"}</div>
              </div>
              <div>
                <div className="text-[8px] uppercase tracking-widest text-ink/50 sm:text-[9px]">
                  Age
                </div>
                <div className="font-medium">{data.age ?? "—"}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[8px] uppercase tracking-widest text-ink/50 sm:text-[9px]">
                  Code
                </div>
                <div className="font-display text-sm sm:text-[15px]">{data.traveller_code}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Level + personality */}
        <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4">
          <span className="rounded-full bg-ink px-3 py-1 text-[9px] font-display uppercase tracking-widest text-paper sm:text-[10px]">
            {level.name}
          </span>
          <span className="rounded-full bg-coral px-3 py-1 text-[9px] font-display uppercase tracking-widest text-primary-foreground sm:text-[10px]">
            {personality}
          </span>
          {data.travel_vibe && (
            <span className="rounded-full border-2 border-ink/70 px-3 py-1 text-[9px] font-display uppercase tracking-widest sm:text-[10px]">
              {data.travel_vibe}
            </span>
          )}
        </div>

        {/* Cant stop doing */}
        {data.cant_stop_doing && (
          <div className="mt-3 rounded-xl border-2 border-dashed border-ink/30 bg-paper/60 p-3 sm:mt-4">
            <div className="text-[8px] uppercase tracking-widest text-ink/60 sm:text-[9px]">
              One thing I can't stop doing
            </div>
            <div className="font-script text-xl leading-tight text-coral sm:text-2xl">
              "{data.cant_stop_doing}"
            </div>
          </div>
        )}

        {/* Vibe tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-sun/70 px-2 py-0.5 text-[9px] font-medium text-ink/80 sm:text-[10px]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stamps grid */}
        <div className="mt-3 sm:mt-4">
          <div className="mb-1.5 text-[8px] uppercase tracking-widest text-ink/60 sm:text-[9px]">
            Community Stamps
          </div>
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
            {slots.map((s, i) => (
              <div
                key={i}
                className={`relative aspect-square rounded-full border-2 ${s.event ? "border-stamp" : "border-dashed border-ink/25"} flex items-center justify-center stamp-fade`}
                title={s.event || "Empty slot"}
              >
                {s.event ? (
                  <div className="text-center leading-none">
                    <div className="text-base sm:text-lg">{s.emoji || "✦"}</div>
                    <div className="text-[6px] font-display uppercase tracking-tight text-stamp sm:text-[7px]">
                      {s.event.slice(0, 6)}
                    </div>
                  </div>
                ) : (
                  <Stamp className="h-3 w-3 text-ink/25" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: verified + QR + icebreaker */}
        <div className="mt-auto flex flex-col gap-3 pt-3 sm:flex-row sm:items-end sm:gap-3">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex w-fit items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[9px] font-display uppercase tracking-widest text-paper sm:text-[10px]">
              <BadgeCheck className="h-3 w-3" /> Community Verified
            </div>
            <div className="rounded-lg border border-ink/15 bg-paper/70 p-2">
              <div className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-ink/60 sm:text-[9px]">
                <Sparkles className="h-2.5 w-2.5" /> Icebreaker
              </div>
              <div className="font-script text-sm leading-tight text-ink sm:text-base">
                {icebreaker}
              </div>
            </div>
            {data.instagram && (
              <div className="text-[9px] text-ink/70 sm:text-[10px]">
                @{data.instagram.replace(/^@/, "")}
              </div>
            )}
          </div>
          <div className="flex shrink-0 justify-center rounded-md border border-ink/20 bg-paper p-1 sm:justify-start">
            {qr ? (
              <img src={qr} alt="QR" className="h-16 w-16 sm:h-20 sm:w-20" />
            ) : (
              <div className="h-16 w-16 sm:h-20 sm:w-20" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
