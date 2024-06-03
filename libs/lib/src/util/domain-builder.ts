export function buildDomains(domain: string) {
  return [
    `https://${domain}`,
    `http://${domain}`,
    `https://www.${domain}`,
    `http://www.${domain}`,
  ];
}
