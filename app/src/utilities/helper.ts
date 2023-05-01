export function capitalize(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function bytesToGig(input: number): number {
  return input / (1024 * 1024 * 1024);
}

export function gigToBytes(input: number): number {
  return input * 1024 * 1024 * 1024;
}
