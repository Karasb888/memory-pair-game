document.addEventListener('DOMContentLoaded', function(){
const CARDS_MAX = 16;
var cardsAtributes = ['spanch1', 'spanch2', 'spanch3', 'spanch4', 'spanch5', 'spanch6', 'spanch7', 'spanch8'];
cardsAtributes = cardsAtributes.concat(cardsAtributes);
const ATRIBUTE_SAME_CARD = 'card';
const OPEN_CARD_ATTRIBUTE = 'open';
const ANIMATION_DURATION = 600;
var countOpenPairs = 0;
var openCards = [];

function rebuildGameCards(nodes, attributes){
  attributes.sort(function() { return 0.5 - Math.random() });
  for(var i = 0; i < nodes.length; i++){
    nodes[i].removeAttribute(ATRIBUTE_SAME_CARD);
    nodes[i].removeAttribute('self');
    nodes[i].removeAttribute(OPEN_CARD_ATTRIBUTE);
    nodes[i].classList.remove('flip');
    nodes[i].setAttribute(ATRIBUTE_SAME_CARD, attributes[i]);
  }
};

function pairChecking(array){
  if(array.length === 2){
    if(array[0].getAttribute(ATRIBUTE_SAME_CARD) === array[1].getAttribute(ATRIBUTE_SAME_CARD)){
      countOpenPairs++;
      array[0].setAttribute(OPEN_CARD_ATTRIBUTE, OPEN_CARD_ATTRIBUTE);
      array[1].setAttribute(OPEN_CARD_ATTRIBUTE, OPEN_CARD_ATTRIBUTE);
      array.splice(0, 2);
      if(countOpenPairs === CARDS_MAX / 2){
        setTimeout(gameRestart, ANIMATION_DURATION);
      }
    }
  }else if(array.length === 3){
    array[0].classList.remove('flip');
    array[1].classList.remove('flip');
    array[0].removeAttribute('self');
    array[1].removeAttribute('self');
    array.splice(0, 2);
  }
};

function gameRestart(){
  alert('You win!');
  rebuildGameCards(CARDS, cardsAtributes);
  openCards = [];
};

  const GAME_CONTAINER = document.getElementById('game');
  const CARDS = document.querySelectorAll('.flip-container');
  rebuildGameCards(CARDS, cardsAtributes);

  GAME_CONTAINER.addEventListener('click', function(e){
    let clickedCard = e.target.closest('.flip-container');

    if(clickedCard.getAttribute(OPEN_CARD_ATTRIBUTE) === null && clickedCard.getAttribute('self') === null){
      clickedCard.setAttribute('self', 'self');
      clickedCard.classList.add('flip');
      openCards.push(clickedCard);
      pairChecking(openCards);
    }
  });
});
