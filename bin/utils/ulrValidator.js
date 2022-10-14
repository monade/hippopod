export function validUrl(url, domain) {
  let urlObj;
  try {
    urlObj = new URL(url);
  } catch (_) {
    return false;
  }
  if (domain && !url.includes(domain)) {
    return false;
  }
  return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
}
