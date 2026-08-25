"use client";

import { partners } from "@/lib/partners";
import Image from "next/image";

export default function PartnersStrip() {
  const doubled = [...partners, ...partners, ...partners];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-8 text-center">
        Backed by
      </p>
      <div className="relative overflow-hidden">
        <div className="flex gap-12 items-center animate-scroll">
          {doubled.map((partner, i) => (
            <a
              key={`${partner.name}-${i}`}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              {partner.logoUrl ? (
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              ) : (
                <span className="text-lg font-bold text-muted whitespace-nowrap">
                  {partner.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
