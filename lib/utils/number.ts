export function toArabicNumber(number: number | string) {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  return number
    .toString()
    .split("")
    .map((digit) => arabicNumbers[Number(digit)])
    .join("");
}
