export const _expand = (hex) => {
  let x = ''
  for (let c of hex) x += c + c
  return x
}