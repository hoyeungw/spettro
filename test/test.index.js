// import { RgbTransHslTest } from './tasks/RgbTransHsl.test'
//
// RgbTransHslTest.testHslToRgb()
// '' |> console.log
// RgbTransHslTest.testRgbToHsl()
// '' |> console.log

import { PaletteTest } from './tasks/palette.test'
import { CrosTab, CrosX } from 'crostab'
import chalk from 'chalk'
import { palette } from '../src/themes/palette'
import { Mat } from 'veho'

PaletteTest.testRgbToHsl()

const crosTab = new CrosTab(
  Object.keys(palette.red),
  Object.entries(palette).map(([name, { base }]) => chalk.hex(base)(name)),
  (Object.values(palette).map(tube => Object.values(tube).map(x => chalk.hex(x).inverse(' '))) |> Mat.transpose)
)
// crosTab.banner = crosTab.banner.map(x => chalk.hex('#ff6e40')(x))
// crosTab.matrix = crosTab.matrix.map(row => row.map(x => chalk.hex('#ff6e40')(x)))
crosTab |> CrosX.brief |> console.log