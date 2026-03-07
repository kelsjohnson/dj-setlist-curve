export type EnergyLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Track = {
  id: string
  title: string
  artist: string
  bpm: number
  key: string
  energy: EnergyLevel
  tags: string[]
}