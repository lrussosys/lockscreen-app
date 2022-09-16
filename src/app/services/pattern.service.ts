import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatternService {
  constructor() {}

  combinazioneCorretta!: any;
  newDiv!: any;
  linesCollection: any;
  combinazioneDigitata: any = [];

  currentValue: any;

  correct: boolean = false;
  wrong: boolean = false;
  //animazione
  transitionTiming = 'all 0.1s linear';
  patternSet = false;

  dots: any = [
    { i: 0 },
    { i: 1 },
    { i: 2 },
    { i: 3 },
    { i: 4 },
    { i: 5 },
    { i: 6 },
    { i: 7 },
    { i: 8 },
  ];
  createLine() {
    let parent: any = document.getElementById('line');
    this.newDiv = document.createElement('div');
    this.newDiv.classList.add('line-elem');
    parent.appendChild(this.newDiv);
  }

  removeLines() {
    this.linesCollection = document.getElementsByClassName('line-elem');

    for (let i = this.linesCollection.length - 1; i >= 0; --i) {
      this.linesCollection[i].remove();
    }
  }
  combinazioneSbagliata() {
    this.removeLines();
    this.combinazioneDigitata.forEach((el: any) => {
      el.selected = false;
    });
    this.combinazioneDigitata = [];
    this.correct = false;
    // alert('riprova');
  }

  lineaVersoDestra(secondClick: any, firstClick: any) {
    this.newDiv.style.left = firstClick?.left + firstClick?.width / 2 + 'px';

    this.newDiv.style.transition = this.transitionTiming;
    this.newDiv.style.width = '0px';
    this.newDiv.style.height = '4px';

    setTimeout(() => {
      this.newDiv.style.width = secondClick?.x - firstClick?.x + 'px';
    }, 1);
  }

  lineaVersoSinistra(secondClick: any, firstClick: any) {
    this.newDiv.style.left = firstClick?.left + secondClick?.width / 2 + 'px';

    this.newDiv.style.transform = 'translate(-100%, 0)';
    this.newDiv.style.transition = this.transitionTiming;
    this.newDiv.style.width = '0px';
    this.newDiv.style.height = '4px';

    setTimeout(() => {
      this.newDiv.style.width = firstClick?.x - secondClick?.x + 'px';
      this.newDiv.style.transform = 'translate(-100%, 0)';
    }, 1);
  }

  stileLineaOrizontale(firstClick: any) {
    this.newDiv.style.height = '4px';
    this.newDiv.style.background = 'rgba(255, 255, 255, 0.493)';
    this.newDiv.style.top = firstClick?.top + firstClick?.height / 2 + 'px';
    this.newDiv.style.position = 'fixed';
  }
  lineaVersoBasso(secondClick: any, firstClick: any) {
    this.newDiv.style.transition = this.transitionTiming;

    this.newDiv.style.top = firstClick?.top + firstClick?.height / 2 + 'px';
    this.newDiv.style.height = 0;
    this.newDiv.style.width = '4px';

    this.newDiv.style.background = 'rgba(255, 255, 255, 0.493)';
    this.newDiv.style.left = firstClick?.left + firstClick?.width / 2 + 'px';
    this.newDiv.style.position = 'fixed';

    setTimeout(() => {
      this.newDiv.style.height = secondClick?.y - firstClick?.y + 'px';
      // this.newDiv.style.transform = 'translate(-100%, 0)';
    }, 1);
  }
  lineaVersoAlto(secondClick: any, firstClick: any) {
    this.newDiv.style.transform = 'translate(0, -100%)';

    this.newDiv.style.transition = this.transitionTiming;

    this.newDiv.style.top = firstClick?.y + firstClick?.height / 2 + 'px';

    this.newDiv.style.height = 0;

    this.newDiv.style.width = '4px';

    this.newDiv.style.background = 'rgba(255, 255, 255, 0.493)';

    this.newDiv.style.left = firstClick?.left + firstClick?.width / 2 + 'px';
    this.newDiv.style.position = 'fixed';

    setTimeout(() => {
      this.newDiv.style.height = firstClick?.y - secondClick?.y + 'px';
    }, 1);
  }
  distanzaTraDuePunti(secondClick: any, firstClick: any) {
    let tempX = secondClick.x - firstClick.x;
    let tempY = secondClick.y - firstClick.y;
    return Math.sqrt(Math.pow(tempX, 2) + Math.pow(tempY, 2));
  }
  stileDiagonale(firstClick: any, inclination: any) {
    this.newDiv.style.background = 'rgba(255, 255, 255, 0.493)';
    this.newDiv.style.top = firstClick?.top + firstClick?.height / 2 + 'px';
    this.newDiv.style.left = firstClick?.left + firstClick?.width / 2 + 'px';
    this.newDiv.style.position = 'fixed';
    this.newDiv.style.transformOrigin = 'top';
    this.newDiv.style.transform = `rotate(${inclination}deg)`;
  }
}
