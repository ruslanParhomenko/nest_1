export function getFormIdFromPathname(pathname: string): string {
  const mainRoute = pathname.split("/")[1] || "";
  return `${mainRoute}-form`;
}
