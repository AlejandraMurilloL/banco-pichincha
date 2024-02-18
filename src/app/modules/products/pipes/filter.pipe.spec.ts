import { mockProducts } from '../const/mocks.const';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return original list when there is no textFilter', () => {
    const pipe = new FilterPipe();
    const result = pipe.transform(mockProducts, '');
    expect(result).toBe(mockProducts);
  });

  it('should return filtered list when there is textFilter', () => {
    const pipe = new FilterPipe();
    const result = pipe.transform(mockProducts, 'Producto 1');
    expect(result.length).toBe(1);
  });
});
