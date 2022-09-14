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
  combinazioneEsatta = [0, 3, 6];
  combinazioneDigitata: any = [];
  counter = 0;
  newDiv!: any;
  linesCollection!: any;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.addCoordinates();
    }, 1);
    console.log(this.dots);
  }

  onClick(dot: any, i: any) {
    this.counter++;
    this.combinazioneDigitata.push(dot);
    if (this.combinazioneEsatta.length == this.combinazioneDigitata.length) {
      let temp = this.combinazioneEsatta.filter((c, index) => {
        return this.combinazioneDigitata[index].i == c;
      });
      if (temp.length === this.combinazioneEsatta.length) {
        console.log('trovata');
      } else {
        this.combinazioneDigitata = [];
        alert('riprova');
        this.removeLines();
      }
    }
    if (this.combinazioneDigitata.length > this.combinazioneEsatta.length) {
      this.combinazioneDigitata = [];
      alert('riprova');
      this.removeLines();
    }

    console.log(this.combinazioneDigitata);

    this.getLineParameters(this.combinazioneDigitata);
  }

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
      };
      i++;
    });
  }

  getLineParameters(obj: any) {
    console.log(obj);

    // x = è verticale
    // y = è orizzontale
    // x e y != allora diagonale

    let firstClick = obj[obj.length - 2]
    let secondClick = obj[obj.length - 1]

    if (obj.length >= 2) {
      // orizzontale
      if (secondClick.y == firstClick.y) {
        this.createLine();

        // linea verso destra
        if (secondClick.x > firstClick.x) {
          this.newDiv.style.width =
            secondClick?.x - firstClick?.x + 'px';
          this.newDiv.style.left =
            firstClick?.left + firstClick?.width / 2 + 'px';
          // linea verso sinistra
        } else {
          this.newDiv.style.width =
            firstClick?.x - secondClick?.x + 'px';
          this.newDiv.style.left =
            secondClick.x + firstClick?.width / 2 + 'px';
        }

        this.newDiv.style.height = '1px';
        this.newDiv.style.background = 'black';
        this.newDiv.style.top =
          firstClick?.top + firstClick?.height / 2 + 'px';
        this.newDiv.style.position = 'fixed';

        // verticale
      } else if (secondClick.x == firstClick.x) {
        this.createLine();

        // linea verso basso
        if (secondClick.y > firstClick.y) {
          this.newDiv.style.top =
            firstClick?.top + firstClick?.height / 2 + 'px';

          this.newDiv.style.height =
            secondClick?.y - firstClick?.y + 'px';

          // linea verso alto
        } else {
          this.newDiv.style.top =
            secondClick?.y + firstClick?.height / 2 + 'px';

          this.newDiv.style.height =
            firstClick?.y - secondClick?.y + 'px';
        }

        this.newDiv.style.width = '1px';

        this.newDiv.style.background = 'black';

        this.newDiv.style.left =
          firstClick?.left + firstClick?.width / 2 + 'px';
        this.newDiv.style.position = 'fixed';

        // diagonale
      } else if (
        secondClick.x !== firstClick.x &&
        secondClick.y !== firstClick.y
      ) {
        let y = firstClick.y - secondClick.y;
        let x = firstClick.x - secondClick.x;

        console.log(Math.atan2(y, x));
        this.createLine();

        // calcolo distanza tra due punti
        let tempx = secondClick.x - firstClick.x;
        let tempy = secondClick.y - firstClick.y;
        let distance = Math.sqrt(tempx * tempx + tempy * tempy);

        this.newDiv.style.width = '1px';
        this.newDiv.style.height = distance + 'px';
        this.newDiv.style.background = 'black';
        this.newDiv.style.top =
          firstClick?.top + firstClick?.height / 2 + 'px';
        this.newDiv.style.left =
          firstClick?.left + firstClick?.width / 2 + 'px';
        this.newDiv.style.position = 'fixed';
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
}
