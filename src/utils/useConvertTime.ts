export function useConvertTime(timestamp: number | null | undefined): string {
  if (timestamp == null) {
    return ""; // or any other default value or message you prefer
  }

  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function useConvertTimeHours(
  timestamp: number | null | undefined
): string {
  if (timestamp == null) {
    return ""; // or any other default value or message you prefer
  }

  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleTimeString("en-US", options);
}

export function useConvertTimeDay(
  timestamp: number | null | undefined
): string {
  if (timestamp == null) {
    return ""; // or any other default value or message you prefer
  }

  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };

  return date.toLocaleDateString("en-US", options);
}
