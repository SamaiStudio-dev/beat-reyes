export const FRAME_COUNT = 240;

export function frameName(index: number) {
  return `frame_${String(index).padStart(4, "0")}.png`;
}

export function frameSrc(index: number) {
  return `/frames/${frameName(index)}`;
}
