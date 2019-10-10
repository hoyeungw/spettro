import { CompareHslToRgb } from '../tasks/strategies/HslToRgbPrep'

describe('Compare Rgb to Hsl Strategies', function () {
  this.timeout(1000 * 60)
  it('Compare Hsl To Rgb: compare Hsl To Rgb Perf ', () => {
    CompareHslToRgb.compareHslToRgbPerf()
  })
})