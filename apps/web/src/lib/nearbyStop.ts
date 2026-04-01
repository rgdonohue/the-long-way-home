/**
 * Find the most relevant nearby interesting place for a given route.
 *
 * Selection: minimum haversine distance from each candidate to any
 * vertex of the route polyline. Returns the closest candidate within
 * the distance threshold, or null if nothing qualifies.
 */

import type { Place } from "../data/places";

const EARTH_RADIUS_MILES = 3958.8;
const MAX_DISTANCE_MILES = 1.0;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function haversineMiles(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number,
): number {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_MILES * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export interface NearbyStop {
  place: Place;
  distanceMiles: number;
}

export function findNearbyStop(
  routeCoords: number[][],
  places: Place[],
): NearbyStop | null {
  if (routeCoords.length === 0) return null;

  let best: NearbyStop | null = null;

  for (const place of places) {
    const [pLon, pLat] = place.coordinates;
    let minDist = Infinity;

    for (const coord of routeCoords) {
      const d = haversineMiles(pLon, pLat, coord[0], coord[1]);
      if (d < minDist) minDist = d;
    }

    if (
      minDist <= MAX_DISTANCE_MILES &&
      (best === null || minDist < best.distanceMiles)
    ) {
      best = { place, distanceMiles: minDist };
    }
  }

  return best;
}
