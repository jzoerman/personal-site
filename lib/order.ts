import type { ContentItem } from "./models";

export function active<T extends ContentItem>(
  item: T | null | undefined,
): item is T {
  return item?.isActive === true;
}

// Array.prototype.sort is stable; equal keys retain the editor's input order.
export function ordered<T extends ContentItem>(items: readonly T[] = []): T[] {
  return items.filter(active).sort((a, b) => a.sortKey - b.sortKey);
}

export function safeUrl(value: string): boolean {
  // Allow app paths, fragments, HTTPS/HTTP, email and telephone links only.
  return (
    /^(\/(?![\/\\])[^\\]*|#[^\\]*|https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+)$/i.test(
      value,
    ) && !/[\u0000-\u0020\u007f]/.test(value)
  );
}

// A qualified domain entered without a scheme is an HTTPS destination.
export function normalizeUrl(value: string): string {
  const domain =
    /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}(?::[0-9]{1,5})?(?:[/?#][^\\\s]*)?$/i;
  return domain.test(value) ? `https://${value}` : value;
}
