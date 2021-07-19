import { FinancialFormatPipe } from './financial-format.pipe';

describe('FinancialFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new FinancialFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
