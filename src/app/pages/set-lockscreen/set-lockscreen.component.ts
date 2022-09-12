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
  constructor() {}
  @ViewChildren('dot') dot!: QueryList<ElementRef>;
  dotsLocation: any[] = [];

  currentClickX: any;
  currentClickY: any;

  //   dots = [
  //     { id: 0, valid: false },
  //     { id: 1, valid: false },
  //     { id: 2, valid: false },
  //     { id: 3, valid: false },
  //     { id: 4, valid: false },
  //     { id: 5, valid: false },
  //     { id: 6, valid: false },
  //     { id: 7, valid: false },
  //     { id: 8, valid: false },
  //   ];

  dots = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  counter = 0;
  tempIndex = -1;
  // Stile grafico per hover sui dot
  // Rifare CSS per rendere le aree intorno ai div ben visibili
  // Salvare all'interno della matrice le coordinate, la larghezza e l'altezza dei dot
  // Durante il touchmove verificare che le coordinate dell'evento siano comprese nell'area di almeno uno dei nove dot calcolati in precedenza
  // Verificata la condizione precedente, salvare all'interno di un array la sequenza risultante (seq max: max 6 dot)

  combinazione: Array<number> = [1, 3, 6];
  combinazioneDigitata: Array<number> = [];

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    console.log(this.dot);
    this.dot.forEach((directive, i) => {
      let elem = directive.nativeElement.getBoundingClientRect();
      let x = elem.x;
      let y = elem.y;
      this.dotsLocation.push({
        i: i,
        y: y,
        x: x,
      });
      console.log(directive);
    });
    console.log(this.dotsLocation);
  }

  onClick(e: any, type: string) {
    // console.log(e.target);
    let x = e.touches.item(0)?.clientX;
    let y = e.touches.item(0)?.clientY;

    // console.log(x, y);

    // console.log('x:', e.x, 'y:', e.y);

    // this.dotsLocation.forEach((dot) => {
    //     // dot.x < x < dot.x + dot.width
    //   if (
    //     dot.x < x &&
    //     x < dot.x + dot.width &&
    //     dot.y < y &&
    //     y < dot.y + dot.height
    //   ) {
    //     console.log('trovato');
    //     console.log(dot.parentElement);
    //   } else {
    //     console.log('non trovato');
    //   }
    // });

    this.dotsLocation.forEach((dot, i) => {
      if (dot.x <= x && dot.x + 30 >= x && dot.y <= y && dot.y + 30 >= y) {
        console.log('trovato');
        console.log(this.tempIndex);
        if ((dot.i = this.combinazione[i])) {
          this.combinazioneDigitata.push(dot.i);
          console.log(this.combinazioneDigitata);
        }
        console.log(dot.i);
        if (this.tempIndex < 0 && this.tempIndex != dot.i) {
          this.tempIndex = dot.i;
          this.counter++;
        }
      }
      this.tempIndex = -1;
    });

    // console.log(type, e.touches.item(0)?.clientX);
  }
}
