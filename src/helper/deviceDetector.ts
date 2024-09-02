export const OperatingSystem = {
  iOS: 'iOS',
  Android: 'Android',
  MacOS: 'macOS',
  Windows: 'Windows',
  Linux: 'Linux',
  Unknown: 'unknown',
} as const;

type keys = keyof typeof OperatingSystem;
type values = (typeof OperatingSystem)[keys];

export function detectOS(): values {
  const userAgent: string =
    navigator.userAgent || navigator.vendor || (window as any).opera || '';
  const platform: string = navigator.platform || '';

  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return OperatingSystem.iOS;
  }

  // iOS detection for iPad on iOS 13+
  if (userAgent.includes('Mac') && 'ontouchend' in document) {
    return OperatingSystem.iOS;
  }

  // macOS detection
  if (/Mac/.test(platform) && !('ontouchend' in document)) {
    return OperatingSystem.MacOS;
  }

  // Android detection
  if (/android/i.test(userAgent)) {
    return OperatingSystem.Android;
  }

  // Windows detection
  if (/Win/.test(platform)) {
    return OperatingSystem.Windows;
  }

  // Linux detection
  if (/Linux/.test(platform)) {
    return OperatingSystem.Linux;
  }

  // Additional checks for iOS
  if (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(platform)
  ) {
    return OperatingSystem.iOS;
  }

  // Additional checks for Android
  if (/Tablet|Android/.test(userAgent) && !/Mobile/.test(userAgent)) {
    return OperatingSystem.Android; // Android tablet
  }

  if (
    /Android/.test(userAgent) &&
    /Mobile/.test(userAgent) &&
    !/Windows Phone/.test(userAgent)
  ) {
    return OperatingSystem.Android; // Android phone
  }

  // If no match found, return "unknown"
  return OperatingSystem.Unknown;
}
