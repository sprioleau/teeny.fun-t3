export default function formatAsDomainName(url: string, charactersToDisplay = 20) {
  return url.replace(/^(https?:\/\/)?(www\.)?/g, "").substring(0, charactersToDisplay);
}
