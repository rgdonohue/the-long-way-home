import type { StopSuggestion } from "./api";

type Coord = [number, number];

const EARTH_RADIUS_M = 6371008.8;

function haversineMeters(a: Coord, b: Coord): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const lat1 = toRad(a[1]);
  const lat2 = toRad(b[1]);
  const dLat = lat2 - lat1;
  const dLon = toRad(b[0] - a[0]);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(s)));
}

// Brute-force above this gets sluggish (10! = 3.6M perms); fall back to greedy NN.
const BRUTE_FORCE_MAX = 9;

function pathLength(order: number[], dist: number[][]): number {
  // dist is (N+2)x(N+2); index 0 = origin, 1..N = stops, N+1 = destination.
  let total = dist[0][order[0]];
  for (let i = 0; i < order.length - 1; i++) total += dist[order[i]][order[i + 1]];
  total += dist[order[order.length - 1]][dist.length - 1];
  return total;
}

function bruteForce(n: number, dist: number[][]): number[] {
  const indices = Array.from({ length: n }, (_, i) => i + 1);
  let best = indices.slice();
  let bestLen = pathLength(best, dist);

  const permute = (arr: number[], start: number) => {
    if (start === arr.length - 1) {
      const len = pathLength(arr, dist);
      if (len < bestLen) {
        bestLen = len;
        best = arr.slice();
      }
      return;
    }
    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  };

  permute(indices, 0);
  return best;
}

function nearestNeighbor(n: number, dist: number[][]): number[] {
  const visited = new Array(n + 2).fill(false);
  visited[0] = true;
  visited[n + 1] = true;
  const order: number[] = [];
  let current = 0;
  for (let step = 0; step < n; step++) {
    let nextIdx = -1;
    let nextDist = Infinity;
    for (let j = 1; j <= n; j++) {
      if (!visited[j] && dist[current][j] < nextDist) {
        nextDist = dist[current][j];
        nextIdx = j;
      }
    }
    visited[nextIdx] = true;
    order.push(nextIdx);
    current = nextIdx;
  }
  return order;
}

export function optimizeStopOrder(
  origin: Coord,
  destination: Coord,
  stops: StopSuggestion[],
): StopSuggestion[] {
  const n = stops.length;
  if (n <= 1) return stops;

  const points: Coord[] = [origin, ...stops.map((s) => s.coordinates), destination];
  const size = n + 2;
  const dist: number[][] = Array.from({ length: size }, () => new Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      const d = haversineMeters(points[i], points[j]);
      dist[i][j] = d;
      dist[j][i] = d;
    }
  }

  const order =
    n <= BRUTE_FORCE_MAX ? bruteForce(n, dist) : nearestNeighbor(n, dist);

  return order.map((idx) => stops[idx - 1]);
}
