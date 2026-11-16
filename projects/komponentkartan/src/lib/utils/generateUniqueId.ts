export function generateUniqueId(label: string, document: Document, componentString: string): string {
    const prefix = label ? `${label}-` : `${componentString}-`;

    const existingElements = Array.from(document.querySelectorAll(`[id^="${prefix}"]`));
    const nextNumber = existingElements.length + 1;

    return `${prefix}${nextNumber}`;
  }
