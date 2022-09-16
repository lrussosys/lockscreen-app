import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { PatternService } from 'src/app/services/pattern.service';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css'],
})
export class LockscreenComponent implements AfterViewInit {
  @ViewChildren('dot') dot!: QueryList<ElementRef>;

  constructor(private patternService: PatternService, private router: Router) {}

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
  combinazioneEsatta = this.patternService.combinazioneCorretta;
  combinazioneDigitata: any = [];
  newDiv!: any;
  linesCollection!: any;
  currentValue: any;

  correct: boolean = false;
  wrong: boolean = false;
  //animazione
  transitionTiming = 'all 0.1s linear';

  ngOnInit(): void {
    if (this.patternService.combinazioneCorretta == undefined) {
      this.router.navigate(['/home']);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.addCoordinates();
    }, 1);
  }

  onTouch(ev: any) {}

  onClick(dot: any, i: any, e: any) {
    dot.selected = true;

    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;

    if (document.elementFromPoint(x, y)?.classList.contains('innerDot')) {
      let elem: any = document?.elementFromPoint(x, y)?.innerHTML;
      let e = parseInt(elem);
      dot = this.dots[e];
      dot.selected = true;
    }

    // controllo se il valore inserito é giá presente nell`array digitato
    if (this.combinazioneDigitata.indexOf(dot) === -1) {
      this.combinazioneDigitata.push(dot);
      this.getLineParameters(this.combinazioneDigitata);
    }
  }

  //al touchend controlla se è la combinazione esatta o meno
  onTouchEnd() {
    let temp = this.combinazioneEsatta.filter((c: any, index: any) => {
      return this.combinazioneDigitata[index]?.i == c;
    });
    const TIMEOUTONTOUCHEND = 2000;
    if (JSON.stringify(temp) === JSON.stringify(this.combinazioneEsatta)) {
      this.combinazioneDigitata = [];
      this.correct = true;
      setTimeout(() => {
        this.correct = false;
      }, TIMEOUTONTOUCHEND);
      this.removeLines();
      this.dots.forEach((d: any) => {
        d.selected = false;
      });
    } else {
      this.combinazioneSbagliata();
      this.wrong = true;
      setTimeout(() => {
        this.wrong = false;
      }, TIMEOUTONTOUCHEND);
    }
  }

  // trova le coordinate e le mette dell`oggetto dots
  addCoordinates() {
    this.dot.forEach((HTMLel, i = 0) => {
      let elem = HTMLel.nativeElement.getBoundingClientRect();

      this.dots[i] = {
        i: i,
        x: elem.x,
        y: elem.y,
        top: elem.top,
        bottom: elem.bottom,
        right: elem.right,
        left: elem.left,
        width: elem.width,
        height: elem.height,
        selected: false,
      };
      i++;
    });
  }

  getLineParameters(obj: any) {
    // se le x sono uguali la linea è verticale
    // se le y sono uguali la linea è orizzontale
    // se le x e le y sono diverse allora la linea é diagonale

    let firstClick = obj[obj.length - 2];
    let secondClick = obj[obj.length - 1];

    if (obj.length >= 2) {
      // orizzontale
      if (secondClick.y == firstClick.y) {
        this.createLine();

        if (secondClick.x > firstClick.x) {
          // fa la linea verso destra
          this.lineaVersoDestra(secondClick, firstClick);
        } else {
          // fa la linea verso sinistra
          this.lineaVersoSinistra(secondClick, firstClick);
        }
        this.stileLineaOrizontale(firstClick);

        // verticale
      } else if (secondClick.x == firstClick.x) {
        this.createLine();

        // linea verso basso
        if (secondClick.y > firstClick.y) {
          this.lineaVersoBasso(secondClick, firstClick);

          // linea verso alto
        } else {
          this.lineaVersoAlto(secondClick, firstClick);
        }

        // diagonale
      } else if (
        secondClick.x !== firstClick.x &&
        secondClick.y !== firstClick.y
      ) {
        let y = secondClick.y - firstClick.y;
        let x = secondClick.x - firstClick.x;

        // verifica direzione diagonale
        let inclination =
          x > 0
            ? -Math.abs((Math.atan2(x, y) * 180) / Math.PI)
            : Math.abs((Math.atan2(x, y) * 180) / Math.PI);
        this.createLine();

        // calcolo distanza tra due punti
        let distance = this.distanzaTraDuePunti(secondClick, firstClick);

        this.newDiv.style.transition = this.transitionTiming;
        this.newDiv.style.width = '4px';
        this.newDiv.style.height = '0px';

        setTimeout(() => {
          this.newDiv.style.height = distance + 'px';
        }, 1);

        this.stileDiagonale(firstClick, inclination);
      }
    }
  }

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
