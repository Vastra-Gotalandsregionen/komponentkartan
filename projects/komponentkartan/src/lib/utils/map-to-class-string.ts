export function mapToClassString(input: Map<string, boolean>): string {
  const classes = [];
    for (const [key, value] of input) {
      if (value) {
        classes.push(key);
      }
    }

  return classes.join(' ');
}
