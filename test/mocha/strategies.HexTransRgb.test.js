import { CompareHexTransRgb } from '../tasks/strategies/HexToRgbPrep'

describe('Compare Hex Trans Rgb Strategies', function () {
  this.timeout(1000 * 60)
  it('Compare Hex Trans Rgb: test Hex => Rgb ', () => {
    CompareHexTransRgb.testHexToRgb()
  })
  it('Compare Hex Trans Rgb: test Rgb => Hex ', () => {
    CompareHexTransRgb.testRgbToHex()
  })
})