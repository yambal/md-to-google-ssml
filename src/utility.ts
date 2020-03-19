import { iMdToMp3 } from './interface';
import { markdownToSsml } from './libs/markdownToSsml/markdownToSsml'

export const getSsmLMaxLength = (markdown: string, option: iMdToMp3) => {
  let max = 0
  const ssmls = markdownToSsml(markdown, option)
  ssmls.forEach(
    ssml => {
      if (max <= ssml.length) {
          max = ssml.length
      }
    }
  )
  return max
}