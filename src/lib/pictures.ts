import pictures from '../data/pictures.json';

export function getPicture(name: string) {
  const image = pictures[name as keyof typeof pictures];
  if (!image) throw new Error(`Neznámý obrázek v pictures.json: ${name}`);
  return image;
}
