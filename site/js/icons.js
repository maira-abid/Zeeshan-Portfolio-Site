/*
 * Icon sprite. Card-suit, lightning and star shapes follow the style guide (filled + outline versions);
 * social icons are simple one-colour marks. Use as: <svg class="ico"><use href="#i-spade"/></svg>
 */
(function () {
  var o = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
  var shapes = {
    // design / motion themed shapes (used by the floating background)
    sparkle: 'M12 1.5c.9 5.6 4.9 9.6 10.5 10.5-5.6.9-9.6 4.9-10.5 10.5-.9-5.6-4.9-9.6-10.5-10.5C7.1 11.1 11.1 7.1 12 1.5z',
    cursor: 'M5 2.5l14.5 8.2-6.3 1.8 3.7 6.6-2.8 1.6-3.7-6.6-4.5 4.7z',
    play: 'M7 3.5l13 8.5-13 8.5z',
    triangle: 'M12 3l10 17.5H2z',
    bubble: 'M3.5 4h17A1.5 1.5 0 0 1 22 5.5v10a1.5 1.5 0 0 1-1.5 1.5H11l-5.5 4.5V17h-2A1.5 1.5 0 0 1 2 15.5v-10A1.5 1.5 0 0 1 3.5 4z',
    heart: 'M12 21.8C5 15.6 2.2 12.4 2.2 8.6 2.2 5.6 4.4 3.4 7.2 3.4c1.9 0 3.6 1 4.8 2.9 1.2-1.9 2.9-2.9 4.8-2.9 2.8 0 5 2.2 5 5.200 0 3.800-2.800 7-9.800 13.200z',
    club: 'M12 2a4.200 4.200 0 0 0-3 7.100 4.500 4.500 0 1 0 2.300 8.200c-.1 2.200-.9 3.900-2.500 4.700h6.400c-1.600-.8-2.400-2.500-2.500-4.700a4.500 4.500 0 1 0 2.300-8.200A4.200 4.200 0 0 0 12 2z',
    diamond: 'M12 1.800l7 10.200-7 10.200L5 12z',
    spade: 'M12 1.800C9.600 5.600 4 9.100 4 13.600a4.100 4.100 0 0 0 7.200 2.700c-.1 2.400-.9 4.400-2.700 5.500h7c-1.800-1.100-2.600-3.100-2.700-5.500A4.100 4.100 0 0 0 20 13.600C20 9.100 14.400 5.600 12 1.800z',
    bolt: 'M10 1.800h8l-4 7h4.500L6 22.200l3-9H5z',
    star: 'M12 2l2.900 6.900 7.500.5-5.800 4.800 1.900 7.300L12 17.500l-6.500 4 1.900-7.300L1.600 9.400l7.500-.5z',
  };
  var out = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>';
  Object.keys(shapes).forEach(function (k) {
    out += '<symbol id="i-' + k + '" viewBox="0 0 24 24"><path fill="currentColor" d="' + shapes[k] + '"/></symbol>';
    out += '<symbol id="i-' + k + '-o" viewBox="0 0 24 24"><path ' + o + ' d="' + shapes[k] + '"/></symbol>';
  });
  // line-art shapes (outline only)
  out += '<symbol id="i-ring-o" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" ' + o + '/></symbol>';
  out += '<symbol id="i-plus-o" viewBox="0 0 24 24"><path ' + o + ' d="M12 3.500v17M3.500 12h17"/></symbol>';
  out += '<symbol id="i-zigzag-o" viewBox="0 0 24 24"><path ' + o + ' d="M1.500 15.500l5-8 5 8 5-8 5 8"/></symbol>';
  out += '<symbol id="i-bezier-o" viewBox="0 0 24 24"><path ' + o + ' d="M3.500 19.500C6 4 17 20 20.500 4.500"/><circle cx="3.500" cy="19.500" r="1.800" fill="currentColor"/><circle cx="20.500" cy="4.500" r="1.800" fill="currentColor"/></symbol>';
  out += '<symbol id="i-checker-o" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ' + o + '/><path ' + o + ' d="M3 12h18M12 3v18"/><rect x="3" y="3" width="9" height="9" fill="currentColor"/><rect x="12" y="12" width="9" height="9" fill="currentColor"/></symbol>';
  // spiral (Archimedean, 2.25 turns) and orbit (ring with a moving-planet dot)
  var sp = '';
  for (var a = 0; a <= 4.5 * Math.PI; a += 0.12) {
    var r = 1.2 + 9.3 * a / (4.5 * Math.PI);
    sp += (sp ? 'L' : 'M') + (12 + r * Math.cos(a)).toFixed(2) + ' ' + (12 + r * Math.sin(a)).toFixed(2);
  }
  out += '<symbol id="i-spiral-o" viewBox="0 0 24 24"><path ' + o + ' d="' + sp + '"/></symbol>';
  out += '<symbol id="i-orbit-o" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="4.500" ' + o + ' transform="rotate(-30 12 12)"/><circle cx="12" cy="12" r="2.600" fill="currentColor"/><circle cx="19.500" cy="7.700" r="1.500" fill="currentColor"/></symbol>';
  // social
  out += '<symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.200" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.200" cy="6.800" r="1.200" fill="currentColor"/></symbol>';
  out += '<symbol id="i-linkedin" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3.300a2.500 2.500 0 1 1 0 5 2.500 2.500 0 0 1 0-5zM3 9.800h4v11.400H3zM9.500 9.800h3.800v1.600h.1c.5-1 1.800-1.900 3.700-1.900 4 0 4.700 2.600 4.700 6v5.700h-4v-5c0-1.200 0-2.800-1.700-2.800s-2 1.300-2 2.700v5.100h-4z"/></symbol>';
  out += '<symbol id="i-vimeo" viewBox="0 0 24 24"><path fill="currentColor" d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.370-8.290 6.370-1.409 0-2.578-1.294-3.553-3.881L5.322 11.400C4.603 8.816 3.834 7.522 3.010 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.080 2.701 6.266 1.984 7.055 1.910c1.867-.18 3.016 1.100 3.447 3.838.465 2.957.788 4.795.969 5.513.539 2.452 1.131 3.678 1.776 3.678.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.540-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.385 1.179-3.862 3.434-5.739 6.762-5.637 2.469.072 3.633 1.674 3.491 4.822z"/></symbol>';
  out += '<symbol id="i-behance" viewBox="0 0 24 24"><path fill="currentColor" d="M7.800 11.300c1.300-.7 1.900-1.700 1.900-3.100 0-2.700-2-3.600-4.400-3.600H0v14.800h5.600c2.700 0 5.100-1.300 5.100-4.200 0-1.800-.9-3.100-2.900-3.900zM2.900 7h2.100c1 0 1.800.4 1.800 1.500 0 1.100-.6 1.600-1.700 1.600H2.900zm2.500 8.700H2.900v-3.500h2.700c1.200 0 2.100.5 2.100 1.800 0 1.400-1.100 1.700-2.300 1.700zM17.200 7.400c-3.300 0-5.200 2.200-5.200 5.400 0 3.300 1.800 5.400 5.200 5.400 2.500 0 4.100-1.200 4.700-3.300h-2.600c-.2.600-.9 1-1.900 1-1.500 0-2.200-.9-2.300-2.400H22c.2-3.500-1.300-6.100-4.800-6.100zm-2.300 4.500c.1-1.200.9-2 2.200-2s1.900.8 2 2zM14.700 5.100h5.700v1.500h-5.700z"/></symbol>';
  out += '</defs></svg>';
  var d = document.createElement('div');
  d.innerHTML = out;
  document.body.insertBefore(d.firstChild, document.body.firstChild);
})();
