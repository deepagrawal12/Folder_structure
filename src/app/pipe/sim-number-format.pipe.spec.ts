import { SimNumberFormatPipe } from './sim-number-format.pipe';

describe('SimNumberFormatPipe', () => {
  const pipe = new SimNumberFormatPipe();

  it('create an instance', () => {
    const pipe = new SimNumberFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "6666666666666" to "6666 6666 6666 6"', () => {
    expect(pipe.transform('6666666666666')).toBe('6666 6666 6666 6');
  });
});
