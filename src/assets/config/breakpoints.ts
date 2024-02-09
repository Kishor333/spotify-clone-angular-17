module.exports = {
  xs: { max: '599px' },
  sm: { min: '600px', max: '959px' },
  md: { min: '960px', max: '1279px' },
  lg: { min: '1280px', max: '1919px' },
  xl: { min: '1920px', max: '5000px' },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'gt-xs': { min: '600px' },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'gt-sm': { min: '960px' },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'gt-md': { min: '1280px' },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'gt-lg': { min: '1920px' },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'lt-sm': { max: '599px' },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'lt-md': { max: '959px' },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'lt-lg': { max: '1279px' },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'lt-xl': { max: '1919px' },
};
