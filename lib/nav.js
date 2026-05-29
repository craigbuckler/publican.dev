// navigation functions
import { tacs } from 'publican';

// <article> link
export function articleLink( data, headTag = 'h2' ) {

  if (!data?.link || !data?.title) return '';

  return `
    <article>
      <a href="${ data.link }">
        <${ headTag }>${ tacs.lib.feed.escape( data.title ) }</${ headTag }>
        ${ data.description ? `<p>${ tacs.lib.feed.escape( data.description ) }</p>` : '' }
        ${ data.date ? `<p class="pubdate"><time datetime="${ tacs.lib.format.dateISO( data.date ) }">${ tacs.lib.format.dateHuman( data.date ) }</time></p>` : '' }
        ${ data?.wordCount >= tacs.config.wordCountShow ? `<p class="wordcount">${ tacs.lib.format.numberRound( data.wordCount ) } words, ${ tacs.lib.format.numberRound( Math.ceil( data.wordCount / 200 ) ) }-minute read</p>` : '' }
      </a>
    </article>
  `;

}
