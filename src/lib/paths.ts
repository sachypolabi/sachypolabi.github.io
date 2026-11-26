// Relative links work under a custom domain, a Pages project path and file://.
export function rootPrefix(pathname: string): string {
  const depth = pathname.split('/').filter(Boolean).length;
  return '../'.repeat(depth);
}
