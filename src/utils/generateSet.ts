import type { Track, EnergyLevel } from "../types/track"

// union: this variable can only ever be one of these five strings, nothing else
export type CurvePreset = "warm-up" | "build" | "peak" | "wave" | "sunrise"

// what energy should each position in the set be?
// a pre-baked curve shape we’ll later replace with visual custom input
// each preset gives the generator a pre-defined energy curve.

const curveMap: Record<CurvePreset, EnergyLevel[]> = {
    "warm-up": [2, 3, 3, 4, 4],
    build: [3, 4, 5, 6, 7],
    peak: [5, 6, 7, 8, 9],
    wave: [3, 6, 4, 7, 5],
    sunrise: [2, 3, 5, 4, 3],
  }
  
  export type GenerateSetOptions = {
    tracks: Track[]
    preset: CurvePreset
    trackCount: number
    startBpm: number
    selectedTag: string
  }

  export function generateSet({
    tracks,
    preset,
    trackCount,
    startBpm,
    selectedTag,
  }: GenerateSetOptions): Track[] {
    const BPM_TOLERANCE = 8
    let previousBpm = startBpm

    const curve = curveMap[preset]
    const result: Track[] = []
    const usedIds = new Set<string>()

    for (const point of curve) {
      if (result.length >= trackCount) break

      const matchingTrack = tracks.find(
        track =>
          Math.abs(track.energy - point) <= 1 &&
          !usedIds.has(track.id) &&
          (selectedTag === "" || track.tags.includes(selectedTag)) &&     
          Math.abs(track.bpm - previousBpm) <= BPM_TOLERANCE

      )
      if (matchingTrack) {
        result.push(matchingTrack)
        usedIds.add(matchingTrack.id)
        previousBpm = matchingTrack.bpm
      }
    }
    return result

}
