'use strict';
let roulette = document.querySelector('.roulette');
let rouletteInfo = document.querySelector('.info');
let cards = document.querySelector('.cards');
let prizesBlock = document.querySelector('.prizes');
const utils = {
  random: function (min, max) {
    let a = Math.floor(Math.random() * (max - min + 1) + min);
    return a;
  },
};
let prizes = [
  {
    id: 0,
    name: 'Деньги',
    count: 111,
    chance: 90,
  },
  {
    id: 1,
    name: 'BMW iX',
    count: 1,
    chance: 1,
  },
  {
    id: 2,
    name: 'Деньги',
    count: 999,
    chance: 60,
  },
  {
    id: 3,
    name: 'Луи Витон куртка',
    count: 1,
    chance: 25,
  },
  {
    id: 4,
    name: 'Gucci Штаны',
    count: 1,
    chance: 25,
  },
  {
    id: 4,
    name: 'Бургер',
    count: 1,
    chance: 90,
  },
];
let userPrizes = [
  {
    id: 1,
    caseId: 0,
  },
  {
    id: 1,
    caseId: 0,
  },
];

function refreshWinText() {
  rouletteInfo.innerHTML = `ID призов: ${
    userPrizes.length
      ? userPrizes.map((prizeUser) => {
          return ` ${prizeUser.id}`;
        })
      : 'Призов нету. Купите кейсы :)'
  }`;
}
refreshWinText();
function startRoulette(caseId) {
  switch (caseId) {
    case 0:
      let possiblePrizes = [];
      let tmpArr = [];
      let prize;
      let randomTimeTransition = utils.random(7, 11);
      // Создаём массив с возможными призами
      for (let i = 0; i < prizes.length; i++) {
        if (prizes[i].chance >= utils.random(1, 100)) {
          possiblePrizes.push(prizes[i]);
        }
      }

      if (possiblePrizes.length < 1) return startRoulette(caseId); // Если вдруг в possiblePrizes ничего не попадёт

      // Если возможных призов меньше 50, то в рандомном порядке добовляем во временный массив призы из уже доступных.
      // Временный массив нужен, чтобы сделать уникальные id иначе не знаю как сделать
      for (let j = 0; j < 110; j++) {
        let copy = Object.assign({}, possiblePrizes[utils.random(0, possiblePrizes.length - 1)]);
        copy.idInArray = j;
        tmpArr.push(copy);
      }
      possiblePrizes = tmpArr;

      prize = possiblePrizes[utils.random(70, 105)]; // выбираем приз

      cards.style.transition = '0s';
      cards.style.transform = `translate(0, 0)`;

      cards.innerHTML = '';

      possiblePrizes.forEach((possiblePrize) => {
        let div = document.createElement('div');
        div.className = 'card';
        div.dataset.index = possiblePrize.idInArray;

        div.innerHTML = `
              <div class="name">${possiblePrize.name}</div>
              <div class="count">${possiblePrize.count}</div>
            `;

        if (div.dataset.index == prize.idInArray) {
          setTimeout(() => {
            div.classList.add('win');
          }, (randomTimeTransition + 0.01) * 1000);
        }

        cards.append(div);
      });
      
      
      setTimeout(() => {
        userPrizes.push(prize)
        cards.style.transition = `${randomTimeTransition}s ease`;
        cards.style.transform = `translate(-${prize.idInArray * 100 - utils.random(30, 48)}px, 0)`;
      }, 0);
      refreshWinText(); // Обновление данных о призах
      break;

    default:
      alert('Упс.. Ошибка!');
      break;
  }
}
