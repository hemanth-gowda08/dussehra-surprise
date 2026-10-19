(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // A marigold drawn in SVG: three rings of petals around a core.
  function bloom() {
    let s = '<svg viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">';
    [[18, 96, 15, 'p3'], [14, 74, 13, 'p2'], [10, 50, 11, 'p1']].forEach(([n, len, w, c], ring) => {
      for (let i = 0; i < n; i++) {
        s += `<ellipse class="petal ${c}" cx="0" cy="${-len / 2}" rx="${w}" ry="${len / 2}" transform="rotate(${(i * 360) / n + ring * 7})"/>`;
      }
    });
    return s + '<circle class="core" r="14"/></svg>';
  }

  document.getElementById('heroBloom').innerHTML = bloom();

  // Opening: reveal the main experience and move to it.
  const openBtn = document.getElementById('openBtn');
  const main = document.getElementById('main');
  openBtn.addEventListener('click', () => {
    main.hidden = false;
    main.classList.add('is-open');
    openBtn.setAttribute('aria-expanded', 'true');
    main.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    main.focus({ preventScroll: true });
  });

  document.getElementById('topLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  // Photos: tap or press Enter to lift one forward.
  document.querySelectorAll('.shot').forEach((fig) => {
    const toggle = () => fig.classList.toggle('is-lifted');
    fig.addEventListener('click', toggle);
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    const img = fig.querySelector('img');
    img.addEventListener('error', () => fig.classList.add('missing'));
  });

  // Wishes.
  const wishes = [
    'May your favourite song come on at exactly the right moment.',
    'More days that end with "that was a really good day."',
    'Good news that shows up early, and plans that actually happen.',
    'Plenty of laughing until your cheeks hurt.',
    'A year that is kind to you, and as bright as you are.'
  ];
  const wrap = document.getElementById('blooms');
  const list = document.getElementById('wishList');
  const empty = document.getElementById('cardEmpty');
  let lit = 0;

  wishes.forEach((text, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'bloom';
    b.setAttribute('aria-label', `Marigold ${i + 1} of ${wishes.length}`);
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = bloom();
    b.addEventListener('click', () => {
      if (b.classList.contains('lit')) return;
      b.classList.add('lit');
      b.setAttribute('aria-pressed', 'true');
      empty.hidden = true;
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
      if (++lit === wishes.length) document.getElementById('card').classList.add('done');
    });
    wrap.appendChild(b);
  });
})();