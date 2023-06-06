/**
 * Cuts the text to the specified number of characters and inserts 3 dots at the end
 *
 * @param text - text to be trimmed
 * @param trimIndex - index of the character from which the text is to be cut out
 * @returns - trimmed text
 */

export const trimText = (text: string, trimIndex: number): string => {
  if (text.length > trimIndex) {
    return text.slice(0, trimIndex) + '...'
  } else {
    return text
  }
}
