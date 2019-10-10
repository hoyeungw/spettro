import { _f } from '../utils/hsl'

export class Hsl {
  static toRgb ([h, s, l]) {
    [s, l] = [s / 100, l / 100]
    const
      a = s * Math.min(l, 1 - l),
      r = _f(0, h, a, l),
      g = _f(8, h, a, l),
      b = _f(4, h, a, l)
    return [r * 255, g * 255, b * 255]
  }
}