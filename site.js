const form = document.querySelector('form');
const budget = form.elements.budget;
for (const amount of ['50 000 ₽','80 000 ₽','100 000 ₽','150 000 ₽']) {
  budget.add(new Option(amount));
  const button = document.createElement('button');
  button.textContent = amount;
  button.setAttribute('aria-label', 'Обсудить бюджет ' + amount);
  button.onclick = () => { budget.value = amount; document.querySelector('#request').scrollIntoView(); budget.focus({preventScroll:true}); };
  document.querySelector('.prices').append(button);
}
form.onsubmit = event => {
  event.preventDefault();
  const f = form.elements;
  const details = ['Здравствуйте! Хочу обсудить мероприятие.',f.kind.value,
    f.date.value && 'Дата: ' + f.date.value.split('-').reverse().join('.'),
    f.venue.value.trim() && 'Площадка: ' + f.venue.value.trim(),
    'Бюджет: ' + budget.value].filter(Boolean).join('\n');
  location.href = 'https://t.me/LightHotride?text=' + encodeURIComponent(details);
};
const dialog = document.querySelector('dialog'), media = dialog.querySelector('.media');
document.querySelectorAll('[data-photo],[data-video]').forEach(button => {
  button.onclick = () => {
    const video = button.dataset.video;
    const item = document.createElement(video ? 'video' : 'img');
    item.src = 'assets/' + (video || button.dataset.photo);
    if (video) { item.controls = true; item.playsInline = true; } else item.alt = button.dataset.title;
    media.replaceChildren(item);
    if (video) { const link = document.createElement('a'); link.href = item.src; link.textContent = 'Открыть исходное видео'; media.append(link); }
    dialog.querySelector('strong').textContent = button.dataset.title;
    dialog.setAttribute('aria-label',button.dataset.title); dialog.showModal();
  };
});
dialog.querySelector('button').onclick = () => dialog.close();
dialog.onclose = () => media.replaceChildren();
const requestedFormat = new URLSearchParams(location.search).get('format');
if (requestedFormat === 'wedding') form.elements.kind.value = 'Свадьба';
if (requestedFormat === 'corporate') form.elements.kind.value = 'Корпоратив';
if (requestedFormat === 'concert') form.elements.kind.value = 'Концерт';
