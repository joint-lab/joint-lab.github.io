// Punctuation that follows the author at `index` in a list of `authorCount` authors.
// Two-author lists read "A and B" (no Oxford comma); longer lists use ", and" before
// the final author and "," between the rest. The string is appended directly to the
// author's name, so the comma stays glued to it.
export function getAuthorSeparator(index, authorCount) {
  if (index === authorCount - 1) {
    return '';
  }

  if (index === authorCount - 2) {
    return authorCount === 2 ? ' and' : ', and';
  }

  return ',';
}
