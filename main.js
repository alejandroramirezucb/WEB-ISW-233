const container = document.getElementById('container');
const html = `<article class="card">
    <h3 class="card__title"></h3>
    <div class="card__body">
      <div class='card__body__image'></div>
      <section class='card__body__content'>
      </section>
    </div>
  </article>`;

/**
 * @param {string} title
 * @param {string} body
 *
 * @return {HTMLElement
 */
function createCardComponent(title, body) {
  const card = document.createElement('article');
  card.className = 'card';

  const card_title = document.createElement('h3');
  card_title.className = 'card__title';
  card_title.textContent = title;

  const card_body = document.createElement('div');
  card_body.className = 'card__body';

  const card_body_image = document.createElement('div');
  card_body_image.className = 'card__body__image';

  const content_section = document.createElement('section');
  content_section.className = 'card__body__content';
  content_section.textContent = body;

  card_body.appendChild(card_body_image);
  card_body.appendChild(content_section);
  card.appendChild(card_title);
  card.appendChild(card_body);

  return card;
}

const component = createCardComponent(
  'Frontend System Design: Fundamentals',
  'This is a random body text',
);

container.appendChild(component);
