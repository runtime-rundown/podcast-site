import { describe, it, expect } from 'vitest';
import { processTitle } from '../formatting';

describe('processTitle', () => {
  it('should return a slugified version of the title', () => {
    const title = 'This is a title';
    const expected = 'this-is-a-title';
    const result = processTitle(title);
    expect(result).toEqual(expected);
  });

  it('should remove special characters from the title', () => {
    const title = 'This? is a title! @#^+ (with *special* characters $ & %)';
    const expected =
      'this-is-a-title-with-special-characters-dollar-and-percent';
    const result = processTitle(title);
    expect(result).toEqual(expected);
  });
});
