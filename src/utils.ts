export function countReplaces(output: string) {
  return (output.match(/Replacing/g) || []).length;
}
