export function setHostIdFromSiblingText(element: string, elementRef: any) {
    const host = elementRef.nativeElement as HTMLElement;
    if (host.getAttribute('data-element-id') || !host.parentElement) {
      return;
    }

    const siblings = Array.from(host.parentElement.children);
    const hostIndex = siblings.indexOf(host);
    const labelSibling = siblings.slice(0, hostIndex).reverse()
      .find(sibling => ['LABEL', 'P', 'H3', 'H4', 'DIV'].includes(sibling.tagName));
    const labelText = labelSibling?.textContent?.trim();

    if (!labelText) {
      return;
    }

    const idText = labelText.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'label';

    const prefix = idText ? `${idText}-` : `${element}-`;
    const existingElements = Array.from(document.querySelectorAll(`[data-element-id^="${prefix}"]`));
    const nextNumber = existingElements.length + 1;

    host.setAttribute('data-element-id', `${prefix}${nextNumber}`);
  }
