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

    this.createLine(this.combinazioneDigitata);
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

  createLine(obj: any) {
    console.log(obj);

    // x = è verticale
    // y = è orizzontale
    // x e y != allora diagonale

    if (obj.length >= 2) {
      // orizzontale
      if (obj[obj.length - 1].y == obj[obj.length - 2].y) {
        // rendere metodo
        let parent: any = document.getElementById('line');

        this.newDiv = document.createElement('div');

        this.newDiv.classList.add('line-elem');

        parent.appendChild(this.newDiv);
        //

        // linea verso destra
        if (obj[obj.length - 1].x > obj[obj.length - 2].x) {
          this.newDiv.style.width =
            obj[obj.length - 1]?.x - obj[obj.length - 2]?.x + 'px';
          this.newDiv.style.left =
            obj[obj.length - 2]?.left + obj[obj.length - 2]?.width / 2 + 'px';
          // linea verso sinistra
        } else {
          this.newDiv.style.width =
            obj[obj.length - 2]?.x - obj[obj.length - 1]?.x + 'px';
          this.newDiv.style.left =
            obj[obj.length - 1].x + obj[obj.length - 2]?.width / 2 + 'px';
        }

        this.newDiv.style.height = '1px';
        this.newDiv.style.background = 'black';
        this.newDiv.style.top =
          obj[obj.length - 2]?.top + obj[obj.length - 2]?.height / 2 + 'px';
        // this.newDiv.style.left =
        //   obj[obj.length - 2]?.left + obj[obj.length - 2]?.width / 2 + 'px';
        this.newDiv.style.position = 'fixed';

        // verticale
      } else if (obj[obj.length - 1].x == obj[obj.length - 2].x) {
        // rendere metodo
        let parent: any = document.getElementById('line');

        this.newDiv = document.createElement('div');

        this.newDiv.classList.add('line-elem');

        parent.appendChild(this.newDiv);
        //
        this.newDiv.style.width = '1px';
        this.newDiv.style.height =
          obj[obj.length - 1]?.y - obj[obj.length - 2]?.y + 'px';
        this.newDiv.style.background = 'black';
        this.newDiv.style.top =
          obj[obj.length - 2]?.top + obj[obj.length - 2]?.height / 2 + 'px';
        this.newDiv.style.left =
          obj[obj.length - 2]?.left + obj[obj.length - 2]?.width / 2 + 'px';
        this.newDiv.style.position = 'fixed';
        // diagonale
      } else if (
        obj[obj.length - 1].x !== obj[obj.length - 2].x &&
        obj[obj.length - 1].y !== obj[obj.length - 2].y
      ) {
        // rendere metodo
        let parent: any = document.getElementById('line');

        this.newDiv = document.createElement('div');

        this.newDiv.classList.add('line-elem');

        parent.appendChild(this.newDiv);
        //
        this.newDiv.style.width = '1px';
        this.newDiv.style.height =
          obj[obj.length - 1]?.y - obj[obj.length - 2]?.y + 'px';
        this.newDiv.style.background = 'black';
        this.newDiv.style.top =
          obj[obj.length - 2]?.top + obj[obj.length - 2]?.height / 2 + 'px';
        this.newDiv.style.left =
          obj[obj.length - 2]?.left + obj[obj.length - 2]?.width / 2 + 'px';
        this.newDiv.style.position = 'fixed';
      }
    }
  }

  removeLines() {
    this.linesCollection = document.getElementsByClassName('line-elem');

    for (let i = this.linesCollection.length - 1; i >= 0; --i) {
      this.linesCollection[i].remove();
    }
  }
}
// width: calc((162.484375px) - (37.15625px));
// background-color: black;
// height: 1px;
// top: calc(261.359375px + 25px);
// left: calc(37.15625px + 25px);
// position: fixed
