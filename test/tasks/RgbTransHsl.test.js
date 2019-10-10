import ck from 'chalk'
import { VecX } from 'xbrief'
import { colors } from '../asset/colors'
import { Rgb } from '../../src/spettro/Rgb'
import { Hsl } from '../../src/spettro/Hsl'
import { trimColor } from '../util/colorValueHelper'

const len = VecX.maxLength(Object.keys(colors))

export class RgbTransHslTest {
  static testRgbToHsl () {
    for (let [name, { hex, rgb, hsl }] of Object.entries(colors)) {
      // const [r] = rgb
      // if (Math.max(...rgb) !== r) continue
      `${ck.hex(hex).underline(name.padStart(len))}`
        .tag('rgb').tag(rgb)
        .tag('hsl0').tag(hsl)
        .tag('hsl').tag(rgb |> Rgb.toHSL |> trimColor)
        |> console.log
    }
  }

  static testHslToRgb () {
    for (let [name, { hex, rgb, hsl }] of Object.entries(colors)) {
      `${ck.hex(hex).underline(name.padStart(len))}`
        .tag('hsl').tag(hsl)
        .tag('rgb0').tag(rgb)
        .tag('rgb').tag(hsl |> Hsl.toRgb |> trimColor) |> console.log
    }

  }
}

