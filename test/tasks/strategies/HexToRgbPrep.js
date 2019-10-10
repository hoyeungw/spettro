import { colors } from '../../asset/colors'
import { Jso } from 'veho'
import { Chrono } from 'elprimero'
import { Stat } from 'borel'

const cutHex = h => (h.charAt(0) === '#') ? h.substring(1, 7) : h
const expandHex1 = (hexShort) => {
  const [_, r, g, b] = hexShort
  return _ + r + r + g + g + b + b
}
const expandHex2 = (hexShort) => {
  return hexShort.split().map(c => c + c).join()
}
const expandHex3 = (hexShort) => {
  let x = ''
  for (let c of hexShort) x += c + c
  return x
}
const expandHex4 = (hexShort) => {
  let x = ''
  for (let i = 0; i < 3; i++) x += hexShort[i] + hexShort[i]
  return x
}
const round = Math.round

export class HexToRgbPrep {
  static toRgb1 (hex) {
    const match = hex.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i)
    if (!match) return [0, 0, 0]
    let [colorString] = match
    if (match[0].length === 3) {
      colorString = colorString.split('').map(char => char + char).join('')
    }
    const int = parseInt(colorString, 16)
    return [(int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF]
  }

  /**
   * !hex[3]: hex.length <= 3
   * @param hex
   * @returns {*[]}
   */
  static toRgb2 (hex) {
    if (hex[0] === '#') hex = hex.substring(1)
    if (!hex[3]) hex = expandHex3(hex)
    const n = parseInt(hex, 16)
    return [n >> 16, (n >> 8) & 0xFF, n & 0xFF]
  }

  static toRgb3 (hex) {
    const
      cut = cutHex(hex),
      r = parseInt(cut.substring(0, 2), 16),
      g = parseInt(cut.substring(2, 4), 16),
      b = parseInt(cut.substring(4, 6), 16)
    return [r, g, b]
  }

  static toRgb4 (hex) {
    // if (hex.length > 4) {
    const [, r, _r, g, _g, b, _b] = hex
    const
      rv = parseInt(r + _r, 16),
      gv = parseInt(g + _g, 16),
      bv = parseInt(b + _b, 16)
    return [rv, gv, bv]
    // } else {
    //   const [, r, g, b] = hex
    //   const
    //     rv = parseInt(r + r, 16),
    //     gv = parseInt(g + g, 16),
    //     bv = parseInt(b + b, 16)
    //   return [rv, gv, bv]
    // }
  }
}

export class RgbToHexPrep {
  static toHex1 (rgb) {
    const
      [r, g, b] = rgb.map(Math.round),
      n = ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF),
      t = n.toString(16).toUpperCase()
    return '#' + '000000'.substring(t.length) + t
  }

  static toHex2 ([r, g, b]) {
    [r, g, b] = [round(r), round(g), round(b)]
    const n = ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF)
    return '#' + n.toString(16).toUpperCase().padStart(6, '0')
  }
}

export class CompareHexTransRgb {
  static testHexToRgb () {
    const { lapse, result } = Chrono.crossByParamAndFuncs({
      repeat: 500000,
      paramsList: Object.entries(colors).map(([name, { hex }]) => [name, [hex]])
        |> Jso.fromEntries,
      funcList: {
        hexToRgb1: HexToRgbPrep.toRgb1,
        hexToRgb2: HexToRgbPrep.toRgb2,
        hexToRgb3: HexToRgbPrep.toRgb3,
        hexToRgb4: HexToRgbPrep.toRgb4
      }
    })
    lapse
      .unshiftRow('[average]', lapse.columns.map(Stat.avg).map(n => n.toFixed(0)))
      .brief() |> console.log
    '' |> console.log
    result
      .map(hsl => hsl.map(it => it.toFixed()))
      .unshiftCol('[hex]', Object.values(colors).map(({ hex }) => hex))
      .brief() |> console.log
  }

  static testRgbToHex () {
    const { lapse, result } = Chrono.crossByParamAndFuncs({
      repeat: 500000,
      paramsList: Object.entries(colors).map(([name, { rgb }]) => [name, [rgb]])
        |> Jso.fromEntries,
      funcList: {
        rgbToHex1: RgbToHexPrep.toHex1,
        rgbToHex2: RgbToHexPrep.toHex2,
        // rgbToHex3: RgbToHexPrep.toRgb3,
        // rgbToHex4: RgbToHexPrep.toRgb4
      }
    })
    lapse
      .unshiftRow('[average]', lapse.columns.map(Stat.avg).map(n => n.toFixed(0)))
      .brief() |> console.log
    '' |> console.log
    result
      .unshiftCol('[rgb]', Object.values(colors).map(({ rgb }) => rgb))
      .brief() |> console.log
  }
}



