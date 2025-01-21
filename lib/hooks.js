// function hooks

// processContent hook: format markdown {{ filename }} above ``` to a code block tab
export function contentFilename( data ) {
  data.content = data.content
    .replace(/<p>\{\{\s*(.+?)\s*\}\}<\/p>(\s*<pre class="(.+?)")/gi, '<p class="filename $3"><dfn>$1</dfn></p>$2');
}

// processContent hook: replace markdown { aside|section|article } with HTML tags
export function contentSections( data ) {
  data.content = data.content
    .replace(/{\s*(\/{0,1}aside|section|article)\s*\}/gi, '<$1>')
    .replace(/<p><(aside|section|article)><\/p>/gi, '<$1>')
    .replace(/\n<(.+?)><(aside|section|article)>\s/gi, '\n<$2><$1>')
    .replace(/\n<\/(aside|section|article)><\/(.+?)>\n/gi, '</$2></$1>\n');
}


// processRenderStart hook: calculate tacs.tagScore { rel: score } Map
// lesser-used tags have a higher score
export function renderstartTagScore( tacs ) {

  if (!tacs.tagList.length) return;

  // maximum tag count
  const countMax = tacs.tagList[0].count + 1;

  // tag score Map
  tacs.tagScore = new Map();
  tacs.tagList.forEach(t => tacs.tagScore.set(t.ref, countMax - t.count));

}


// processPreRender hook: related posts, generated at pre-render time
export function prerenderRelated( data, tacs ) {

  if (!tacs.tagScore || !data.filename || !data.title || !data.isHTML || !data.tags) return;

  const relScore = [];

  // calculate other post relevency scores
  tacs.all.forEach((post, slug) => {

    if (data.slug == slug || !post.filename || !post.title || !post.isHTML || !post.tags) return;

    let score = 0;

    // calculate matching tag scores
    data.tags.forEach(dTag => {
      post.tags.forEach(pTag => {
        if (dTag.ref === pTag.ref) score += tacs.tagScore.get( dTag.ref );
      });
    });

    // calculate matching directory scores
    const
      dDir = data.link.split('/').filter(d => d),
      pDir = post.link.split('/').filter(d => d);

    let i = 0;
    while (i >= 0) {

      if (dDir[i] && dDir[i] === pDir[i]) {
        i++;
        score += i;
      }
      else i = -1;

    }

    // record related
    if (score) relScore.push( { slug, score });

  });


  // add to related posts sorted by score
  data.related = relScore
    .sort((a, b) => b.score - a.score || b.date - a.date )
    .map(p => tacs.all.get( p.slug ) );

}


// processPostRender hook: add further HTML meta data
export function postrenderMeta( output, data ) {
  if (data.isHTML && data.template !== 'redirect.html') {
    output = output.replace('</head>', '<meta name="generator" content="Publican.dev" />\n</head>');
  }
  return output;
}
