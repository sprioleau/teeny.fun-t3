export default function formatAsDomainName(url: string) {
  return url.replace(/^(https?:\/\/)?(www\.)?/g, "").substring(0, 20);
}
