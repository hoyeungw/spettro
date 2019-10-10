import ck from 'chalk'
import { VecX } from 'xbrief'
import { colors } from '../asset/colors'
import { Rgb } from '../../src/spettro/Rgb'

const len = VecX.maxLength(Object.keys(colors))

export class RgbTransHexTest {
  static testRgbToHex () {
    for (let [name, { hex, rgb }] of Object.entries(colors)) {
      // const [r] = rgb
      // if (Math.max(...rgb) !== r) continue
      `${ck.hex(hex).underline(name.padStart(len))}`
        .tag('rgb').tag(rgb)
        .tag('hex0').tag(hex)
        .tag('hsl').tag(rgb |> Rgb.toHex)
        |> console.log
    }
  }

  static testHexToRgb () {
    for (let [name, { hex, rgb }] of Object.entries(colors)) {
      `${ck.hex(hex).underline(name.padStart(len))}`
        .tag('hex').tag(hex)
        .tag('rgb0').tag(rgb)
        .tag('rgb').tag(hex |> Rgb.fromHex) |> console.log
    }

  }
}

