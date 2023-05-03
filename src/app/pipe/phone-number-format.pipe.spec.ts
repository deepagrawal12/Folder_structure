import { PhoneNumberFormatPipe } from './phone-number-format.pipe';

describe('PhoneNumberFormatPipe', () => {
  const pipe = new PhoneNumberFormatPipe();

  it('create an instance', () => {
    const pipe = new PhoneNumberFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "0498233449" to "0233 44 9"', () => {
    expect(pipe.transform('0498233449')).toBe('0233 44 9 ');
  });
});
