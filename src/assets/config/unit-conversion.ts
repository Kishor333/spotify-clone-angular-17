/**
 * Convert values to rem units based on the provided base font size.
 * @returns An object containing the converted values in rem units.
 **/

export function customUnit(...values: number[]): Record<number, string> {
  const spacingValues: Record<number, string> = {};
  for (const value of values) {
    // basefont(16 defines the base font size of your project)
    const baseFont = 1/16;
    spacingValues[value] = `${value * 0.0625}rem`;
  }
  return spacingValues;
}

//Add new values here
export const spacingValues: Record<number, string> = customUnit(
  0,
  2,
  4,
  6,
  8,
  10,
  12,
  14,
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  30,
  32,
  36,
  40,
  42,
  60
);

/**
 * Use case
 * This function takes in array of numbers which are fontsize in pixel. Then it converts the px to rem
 * The output generated is in rem while input is in px
 * Example use case:
 <span class="p-16">Hello</span>
 This code generates a span tag with following css
 span {
      padding: 1rem;
    }

 <p class="mt-2">Hello</p>
 This code generates a p tag with following css
 p {
          margin-top: 0.125rem;
        }
 **/
