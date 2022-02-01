
import MarkdownIt from 'markdown-it';
import htmlParser from 'html-react-parser'
import hljs from 'highlight.js'
const mdParser = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
  }
})
export const mdparse = (text) => mdParser.render(text)
export const mdToComponent = (text) => htmlParser(mdParser.render(text))