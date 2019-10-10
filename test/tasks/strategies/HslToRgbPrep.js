import { colors } from '../../asset/colors'
import { Jso } from 'veho'
import { Chrono } from 'elprimero'
import { Stat, Zu } from 'borel'

const triple = (v) => [v, v, v]
const hueType = (hue) => {
  return ~~(hue % 6)
}
const hslToRgbUtil = (h, c, x) => {
  if (0 <= h && h < 1) return [c, x, 0]
  if (h < 2) return [x, c, 0]
  if (h < 3) return [x, c, 0]
  if (h < 4) return [0, c, x]
  if (h < 5) return [x, 0, c]
  if (h <= 6) return [c, 0, x]
  return [0, 0, 0]
}
const hslToRgbUtil2 = (h, c, x) => {
  switch (hueType(h)) {
    case 0:
      return [c, x, 0]
    case 1:
      return [x, c, 0]
    case 2:
      return [x, c, 0]
    case 3:
      return [0, c, x]
    case 4:
      return [x, 0, c]
    case 5:
      return [c, 0, x]
  }
}

export class HslToRgbPrep {
  static toRgb1 ([h, s, l]) {
    [h, s, l] = [h / 360, s / 100, l / 100]
    if (!s) {
      const v = l * 255
      return [v, v, v]
    }
    let t2, t3, val
    t2 = l < 0.5
      ? l * (1 + s)
      : l + s - l * s
    const t1 = 2 * l - t2
    const rgb = Array(3)
    for (let i = 0; i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1)
      if (t3 < 0) t3++
      if (t3 > 1) t3--
      val = 6 * t3 < 1
        ? t1 + (t2 - t1) * 6 * t3
        : val = 2 * t3 < 1
          ? t2
          : val = 3 * t3 < 2
            ? t1 + (t2 - t1) * (2 / 3 - t3) * 6
            : t1
      rgb[i] = val * 255
    }
    return rgb
  }

  static toRgb2 ([h, s, l]) {
    if (!s) {return triple(l * 2.55)}
    [h, s, l] = [h / 60, s / 100, l / 100]
    const
      c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(h % 2 - 1)),
      m = l - c / 2
    let [rv, gv, bv] = hslToRgbUtil(h, c, x)
    return [(rv + m) * 255, (gv + m) * 255, (bv + m) * 255]
  }

  static toRgb3 ([h, s, l]) {
    [s, l] = [s / 100, l / 100]
    const
      a = s * Math.min(l, 1 - l),
      f = (n, k = (n + h / 30) % 12) =>
        l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return [f(0) * 255, f(8) * 255, f(4) * 255]
  }

  static toRgb4 ([h, s, l]) {
    return Hsl.toRgb([h, s, l])
  }
}

export class CompareHslToRgb {
  static compareHslToRgbPerf () {
    const paramsList = Object.entries(colors)
      .map(([name, { hsl }]) => [name, [hsl]])
      |> Jso.fromEntries
    const { lapse, result } = Chrono.crossByParamAndFuncs({
      repeat: 1000000,
      paramsList,
      funcList: {
        rgb1: HslToRgbPrep.toRgb1,
        rgb2: HslToRgbPrep.toRgb2,
        rgb3: HslToRgbPrep.toRgb3,
        rgb4: HslToRgbPrep.toRgb4
      }
    })
    lapse
      .unshiftRow('[average]', lapse.columns.map(Stat.avg).map(n => n.toFixed(0)))
      .brief() |> console.log
    '' |> console.log
    result
      .map(hsl => hsl.map(it => it.toFixed()))
      .unshiftCol('[hsl]', Object.values(colors).map(({ hsl }) => hsl))
      .brief() |> console.log
  }

  static testHueUtil () {
    const paramsList = {
      num_m60_0: [Zu.randBetween(-60, 0)],
      num_0_60: [Zu.randBetween(0, 60)],
      num_60_120: [Zu.randBetween(60, 120)],
      num_120_180: [Zu.randBetween(120, 180)],
      num_180_240: [Zu.randBetween(180, 240)],
      num_240_300: [Zu.randBetween(240, 300)],
      num_300_360: [Zu.randBetween(300, 360)],
      num_360_420: [Zu.randBetween(360, 420)],
      num_420_480: [Zu.randBetween(420, 480)],
      num_480_640: [Zu.randBetween(480, 640)],
    }
    paramsList |> console.log
    const { lapse, result } = Chrono.crossByParamAndFuncs({
      repeat: 8000000,
      paramsList,
      funcList: {
        hueUtilShort: hue => ~~((hue / 60) % 6),
        hueUtilIfsAlpha: hue => {
          let h = hue / 60
          if (0 <= h && h < 1) {
            return 0
          } else if (1 <= h && h < 2) {
            return 1
          } else if (2 <= h && h < 3) {
            return 2
          } else if (3 <= h && h < 4) {
            return 3
          } else if (4 <= h && h < 5) {
            return 4
          } else if (5 <= h && h < 6) {
            return 5
          } else {
            return NaN
          }
        },
        hueUtilIfsBeta: hue => {
          if (hue < 60) return 0
          if (hue < 120) return 1
          if (hue < 180) return 2
          if (hue < 240) return 3
          if (hue < 300) return 4
          if (hue <= 360) return 5
          return ~~(hue / 60 % 6)
        },
        hueUtilElvisAlpha: hue => {
          let h = hue / 60
          return 0 <= h && h < 1
            ? 0
            : h < 2
              ? 1
              : h < 3
                ? 2
                : h < 4
                  ? 3
                  : h < 5
                    ? 4
                    : h < 6
                      ? 5
                      : 0
        },
        hueUtilSwitch: h => {
          switch (true) {
            case (h < 60):
              return 0
            case (h < 120):
              return 1
            case (h < 180):
              return 2
            case (h < 240):
              return 3
            case (h < 300):
              return 4
            case (h < 360):
              return 5
          }
        }
      }
    })
    lapse
      .unshiftRow('[average]', lapse.columns.map(Stat.avg).map(n => n.toFixed(0)))
      .brief() |> console.log
    '' |> console.log
    result
      .brief() |> console.log
  }
}


