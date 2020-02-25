import { markdownToSsml, iMarkdownToSsmlOptions } from './markdownToSsml'

interface iMdToMp3 extends iMarkdownToSsmlOptions {

}

export const mdToMp3 = (markdown: string, option: iMdToMp3) => {
    const ssml = markdownToSsml(markdown, option)
}