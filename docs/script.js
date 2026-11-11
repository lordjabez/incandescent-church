// The Church of the Incandescent Filaments. A few small behaviors, no dependencies.

// 1. The light: warm by default, fluorescent on request (and regretted).
const root = document.documentElement;
const notice = document.querySelector('.panel-notice');
const nav = document.querySelector('.nav');
for (const control of document.querySelectorAll('.js-light')) {
  control.addEventListener('click', () => {
    const fluorescent = root.classList.toggle('fluorescent');
    notice.style.minHeight = `${nav.offsetHeight}px`;
    notice.hidden = !fluorescent;
  });
}

// 2. The test of the room.
const verdicts = [
  'A dark room. The dark room is honest; it is a room one knows to leave. Take your candle.',
  'One filament present is not the faith. Hung alone, it is a costume. Do not be deceived by it.',
  'Two is not yet the faith. Read the room’s creed, if it has one.',
  'Three are lit. Notice which have dimmed, and attend to them.',
  'Four, and one flickering. The tending is not glamorous. The tending is the work.',
  'All five are glowing. This is the room of the faith. Stay in this hour; the hour is willing to be stayed in. Amen, and cheers.',
];
const test = document.querySelector('.room-test');
const boxes = [...test.querySelectorAll('input[type=checkbox]')];
const updateVerdict = () => {
  const lit = boxes.filter((box) => box.checked).length;
  test.querySelector('.js-count').textContent = lit;
  test.querySelector('.js-verdict').textContent = verdicts[lit];
  test.classList.toggle('all-lit', lit === boxes.length);
};
test.addEventListener('change', updateVerdict);
updateVerdict();

// 3. Mark the next fixed observance on the calendar.
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const dated = [...document.querySelectorAll('.calendar li[data-month]')].map((item) => {
  const date = new Date(today.getFullYear(), item.dataset.month - 1, Number(item.dataset.day));
  if (date < today) date.setFullYear(date.getFullYear() + 1);
  return { item, date };
});
dated.sort((a, b) => a.date - b.date);
const next = dated[0].item;
next.classList.add('next');
next.querySelector('.when').insertAdjacentHTML('beforeend', ' <span class="badge">next observance</span>');

// 4. The palette, transcribed from the "Colors of the Faith" sheet of the workbook.
const palette = [
  ['Neutrals', [['Pure White', 'FFFFFF'], ['Flake Salt White', 'ECECEC'], ['Millennial Grey', 'CCCCCC'], ['Threshold Cobblestone', '808285'], ['Lamplighters’ Charcoal', '4A4A4A'], ['Mr. Tux Black', '1F1F1F'], ['Pure Black', '000000']]],
  ['Papers', [['Antiquities Alabaster', 'FFFEFA'], ['Museum Ivory', 'FFFDF3'], ['Parchment Crease', 'F4EFE6'], ['Warm White Light', 'FFF5D1']]],
  ['Brown', [['Unread Pages', 'F7EFE8'], ['Second Cup Crema', 'C49A6C'], ['Camel Cashmere Coat', 'A67C52'], ['Library Oak', '644C31']]],
  ['Red', [['Unapologetic Blush', 'FAEDED'], ['Plaster Cast Rose', 'DCA8A3'], ['Hearthstone', 'BE645A'], ['Speakeasy Crimson', '8E0A26']]],
  ['Orange', [['Ginger Ale', 'FCE4D6'], ['The Giant Peach', 'F4B084'], ['Soul Ginger', 'E27D60'], ['Radiator Rust', 'B85C38']]],
  ['Gold', [['Candlelight', 'F2E0B6'], ['Crémant Gold', 'FFE37D'], ['Filament Amber', 'FEC500'], ['Illuminated Brass', 'BD8D23']]],
  ['Green', [['Overwatered Mint', 'EAF4EC'], ['South-Facing Fern', 'A8CDB1'], ['Rosemary Garnish', '67A776'], ['Well-Watered Plant', '397249']]],
  ['Teal', [['Faded Verdigris', 'CDE5E1'], ['Absinthe Coupe', '4A7C7B'], ['Patinaed Filament', '3E6B6A'], ['College Ivy Vine', '345C5A']]],
  ['Blue', [['First Light', 'E6EEF5'], ['Museum Porcelain', '91B2D5'], ['Vestment Navy', '335384'], ['Longest Night', '003271']]],
  ['Purple', [['Cold Ash Lavender', 'F6EDF7'], ['Hour Before Dusk', 'B49CB6'], ['Dusk Violet', '724B75'], ['Shadow Plum', '593D5C']]],
];
const luminance = (hex) => {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
document.querySelector('.js-palette').innerHTML = palette.map(([family, swatches]) => `
  <div class="family">
    <h3>${family}</h3>
    <ul>${swatches.map(([name, hex]) => `
      <li style="background:#${hex};color:${luminance(hex) > 0.3 ? '#1F1F1F' : '#FFF5D1'}">
        <span class="swatch-name">${name}</span><span class="swatch-hex">#${hex}</span>
      </li>`).join('')}
    </ul>
  </div>`).join('');
