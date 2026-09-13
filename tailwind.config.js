/* Shared by every page. Must load AFTER the Tailwind CDN script, which reads
   window.tailwind.config when it generates classes. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        /* Core surfaces — three steps of depth, nothing more */
        charcoal:  '#19171A',
        surface:   '#221F23',
        raised:    '#2B272C',
        /* Accents — champagne leads, rosegold supports, plum adds depth.
           The old magenta/teal/amber/violet set was six competing accents
           on one page; it read as carnival rather than luxury. */
        /* Matched to the logo's foil gold (hue 86, chroma 33). The previous
           #D9B26F was chroma 40 — visibly more mustard than the mark sitting
           beside it in the header. 10.1:1 against charcoal either way round. */
        champagne: '#DDC086',
        rosegold:  '#C79A8B',
        plum:      '#6E3A52',
        cream:     '#F5EFE6',
        muted:     '#B3A79E',  /* 7.58:1 on charcoal — was #a89c93 at 6.65:1 */
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 18px 40px -22px rgba(0,0,0,0.95)',
        glow: '0 14px 34px -18px rgba(221,192,134,0.55)',
      },
    }
  }
}
