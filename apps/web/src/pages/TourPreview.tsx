import { useState } from "react";
import { Link } from "react-router-dom";
import { TourStoryMap } from "./TourStoryMap";
import type { TourDefinition } from "../types/tour";

function isValidTour(data: unknown): data is TourDefinition {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  const route = d.route as Record<string, unknown> | undefined;
  const geo = route?.geometry as Record<string, unknown> | undefined;
  return (
    typeof d.slug === "string" &&
    typeof d.name === "string" &&
    typeof d.mode === "string" &&
    Array.isArray(geo?.coordinates) &&
    Array.isArray(d.stops)
  );
}

function readPreviewTour(): TourDefinition | null {
  try {
    const raw = sessionStorage.getItem("detour:preview-tour");
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValidTour(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function TourPreview() {
  const [tour] = useState<TourDefinition | null>(() => readPreviewTour());

  if (!tour) {
    return (
      <div className="story-map story-map--error">
        <Link to="/build" className="story-map__back-link">
          ← Back to map
        </Link>
        <div className="map-error">
          No preview available.{" "}
          <Link to="/build">Build a route</Link>
        </div>
      </div>
    );
  }

  return <TourStoryMap tour={tour} />;
}
