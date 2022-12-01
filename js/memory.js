const grid = document.querySelector('.grid');
const spanJogador = document.querySelector('.jogador');
const timer = document.querySelector('.timer');

const personagens = [
    'constantine',
    'corintio',
    'death',
    'desire',
    'ethel',
    'john',
    'lucifer',
    'merv',
    'roderick',
    'sandman',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const endGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanJogador.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos!`);
  }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-personagem');
    const secondCharacter = secondCard.getAttribute('data-personagem');
  
    if (firstCharacter === secondCharacter) {
  
      firstCard.firstChild.classList.add('disabled-card');
      secondCard.firstChild.classList.add('disabled-card');
  
      firstCard = '';
      secondCard = '';
  
      endGame();
  
    } else {
      setTimeout(() => {
  
        firstCard.classList.remove('revelar-card');
        secondCard.classList.remove('revelar-card');
  
        firstCard = '';
        secondCard = '';
  
      }, 500);
    }
  
  }
  
  const revelarCard = ({ target }) => {
  
    if (target.parentNode.className.includes('revelar-card')) {
      return;
    }
  
    if (firstCard === '') {
  
      target.parentNode.classList.add('revelar-card');
      firstCard = target.parentNode;
  
    } else if (secondCard === '') {
  
      target.parentNode.classList.add('revelar-card');
      secondCard = target.parentNode;
  
      checkCards();
  
    }  
  } 

const createCard = (personagens) => {

    const card = createElement('div', 'card');
    const frente = createElement('div', 'face frente');
    const atras = createElement('div', 'face atras');

    frente.style.backgroundImage = `url('../images/${personagens}.png')`;

    card.appendChild(frente);
    card.appendChild(atras);

    card.addEventListener('click', revelarCard);
    card.setAttribute('data-personagem', personagens)

    return card;
}

const loadGame = () => {

    const duplicarPersonagens = [ ...personagens, ...personagens];

    const shuffledArray = duplicarPersonagens.sort( () => Math.random() - 0.5 );

    shuffledArray.forEach((personagens) =>{

        const card = createCard(personagens);
        grid.appendChild(card);
    });
}

const cronometro = () => {
  
  setInterval(() => {
    
    const currentTime = timer.innerHTML;
    timer.innerHTML = currentTime + 1;

  }, 1000)
}

window.onload = () => {
  spanJogador.innerHTML = localStorage.getItem('jogador');

  loadGame();
}

