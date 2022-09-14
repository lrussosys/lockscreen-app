import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-set-lockscreen',
  templateUrl: './set-lockscreen.component.html',
  styleUrls: ['./set-lockscreen.component.css'],
})
export class SetLockscreenComponent implements OnInit, AfterViewInit {
  @ViewChildren('dot') dot!: QueryList<ElementRef>;

  constructor() {}

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
  combinazioneEsatta = [0, 3, 6, 4, 2];
  combinazioneDigitata: any = [];
  newDiv!: any;
  linesCollection!: any;
  currentValue: any;

  correct: boolean = false;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.addCoordinates();
    }, 1);
    console.log(this.dots);
  }

  onClick(dot: any, i: any) {
    dot.selected = true;

    // controllo se il valore inserito é giá presente nell`array digitato
    if (this.combinazioneDigitata.indexOf(dot) === -1) {
      this.combinazioneDigitata.push(dot);
    }
    console.log(this.combinazioneDigitata);

    if (this.combinazioneEsatta.length == this.combinazioneDigitata.length) {
      let temp = this.combinazioneEsatta.filter((c, index) => {
        return this.combinazioneDigitata[index].i == c;
      });
      if (temp.length === this.combinazioneEsatta.length) {
        console.log('trovata');
        this.correct = true;
      } else {
        this.combinazioneSbagliata();
      }
    }
    if (this.combinazioneDigitata.length > this.combinazioneEsatta.length) {
      this.combinazioneSbagliata();
    }

    console.log(this.combinazioneDigitata);

    this.getLineParameters(this.combinazioneDigitata);
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
    console.log(obj);
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
          this.lineaVersoGiú(secondClick, firstClick);

          // linea verso alto
        } else {
          this.lineaVersoSú(secondClick, firstClick);
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
        console.log(inclination);
        this.createLine();

        // calcolo distanza tra due punti
        let tempx = secondClick.x - firstClick.x;
        let tempy = secondClick.y - firstClick.y;
        let distance = Math.sqrt(tempx * tempx + tempy * tempy);

        this.newDiv.style.width = '1px';
        this.newDiv.style.height = distance + 'px';
        this.newDiv.style.background = 'black';
        this.newDiv.style.top = firstClick?.top + firstClick?.height / 2 + 'px';
        this.newDiv.style.left =
          firstClick?.left + firstClick?.width / 2 + 'px';
        this.newDiv.style.position = 'fixed';
        this.newDiv.style.transformOrigin = 'top';
        this.newDiv.style.transform = `rotate(${inclination}deg)`;
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
    alert('riprova');
  }

  lineaVersoDestra(secondClick: any, firstClick: any) {
    this.newDiv.style.width = secondClick?.x - firstClick?.x + 'px';
    this.newDiv.style.left = firstClick?.left + firstClick?.width / 2 + 'px';
  }
  lineaVersoSinistra(secondClick: any, firstClick: any) {
    this.newDiv.style.width = firstClick?.x - secondClick?.x + 'px';
    this.newDiv.style.left = secondClick.x + firstClick?.width / 2 + 'px';
  }

  stileLineaOrizontale(firstClick: any) {
    this.newDiv.style.height = '1px';
    this.newDiv.style.background = 'black';
    this.newDiv.style.top = firstClick?.top + firstClick?.height / 2 + 'px';
    this.newDiv.style.position = 'fixed';
  }
  lineaVersoGiú(secondClick: any, firstClick: any) {
    this.newDiv.style.top = firstClick?.top + firstClick?.height / 2 + 'px';
    this.newDiv.style.height = secondClick?.y - firstClick?.y + 'px';
    this.newDiv.style.width = '1px';

    this.newDiv.style.background = 'black';
    this.newDiv.style.left = firstClick?.left + firstClick?.width / 2 + 'px';
    this.newDiv.style.position = 'fixed';
  }
  lineaVersoSú(secondClick: any, firstClick: any) {
    this.newDiv.style.top = secondClick?.y + firstClick?.height / 2 + 'px';

    this.newDiv.style.height = firstClick?.y - secondClick?.y + 'px';

    this.newDiv.style.width = '1px';

    this.newDiv.style.background = 'black';

    this.newDiv.style.left = firstClick?.left + firstClick?.width / 2 + 'px';
    this.newDiv.style.position = 'fixed';
  }
}
