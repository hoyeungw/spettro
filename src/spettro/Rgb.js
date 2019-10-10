import { _bound, _hue } from '../utils/rgb'
import { _expand } from '../utils/hex'

export class Rgb {
  /**
   * !dif: dif===0
   * @param {Number} r - [0,255]
   * @param {Number} g - [0,255]
   * @param {Number} b - [0,255]
   * @returns {*[]} [Hue([0,360]), Saturation([0,100]), Lightness([0,100])]
   */
  static toHSL ([r, g, b]) {
    [r, g, b] = [r / 255, g / 255, b / 255]
    const { max, sum, dif } = _bound([r, g, b])
    let
      h = _hue(r, g, b, max, dif) * 60,
      s = !dif
        ? 0
        : sum > 1
          ? dif / (2 - sum)
          : dif / sum,
      l = sum / 2
    return [h, s * 100, l * 100]
  }

  static toHex ([r, g, b]) {
    [r, g, b] = [Math.round(r), Math.round(g), Math.round(b)]
    const n = ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF)
    return '#' + n.toString(16).toUpperCase().padStart(6, '0')
  }

  static fromHex (hex) {
    if (hex.charAt(0) === '#') hex = hex.substring(1)
    if (!hex[3]) hex = _expand(hex)
    const n = parseInt(hex, 16)
    return [n >> 16, (n >> 8) & 0xFF, n & 0xFF]
  }
}