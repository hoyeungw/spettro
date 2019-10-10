import { palette } from '../../src/themes/palette'
import ck from 'chalk'
import { Rgb } from '../../src'
import { trimColor } from '../util/colorValueHelper'
import { VecX } from 'xbrief'
// const ck = new chalk({level: 3});
const
  nameLen = Object.keys(palette) |> VecX.maxLength,
  indexLen = Object.keys(palette.red) |> VecX.maxLength

export class PaletteTest {
  static testRgbToHsl () {
    for (let [name, colorTube] of Object.entries(palette)) {
      for (let [index, hex] of Object.entries(colorTube)) {
        const
          label = ck.hex(hex).underline(`${name.padStart(nameLen)}.${index.padEnd(indexLen)}`),
          rgb = hex |> Rgb.fromHex |> trimColor,
          hsl = rgb |> Rgb.toHSL |> trimColor;
        `[${label}] (${hex}) [${rgb}] [${hsl}]` |> console.log
      }
      '' |> console.log
    }
  }

}

// it('Palette Test: test Rgb To Hsl ', () => {
//   PaletteTest.testRgbToHsl()
// })