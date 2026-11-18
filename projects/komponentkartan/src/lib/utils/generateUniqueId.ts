export function generateUniqueId(label: string, document: Document, componentString: string): string {

    const idText = label.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'label';

    const prefix = idText ? `${idText}-` : `${componentString}-`;

    const existingElements = Array.from(document.querySelectorAll(`[id^="${prefix}"]`));
    const nextNumber = existingElements.length + 1;

    return `${prefix}${nextNumber}`;
  }
