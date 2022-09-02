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
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  // Stile grafico per hover sui dot
  // Rifare CSS per rendere le aree intorno ai div ben visibili
  // Salvare all'interno della matrice le coordinate, la larghezza e l'altezza dei dot
  // Durante il touchmove verificare che le coordinate dell'evento siano comprese nell'area di almeno uno dei nove dot calcolati in precedenza
  // Verificata la condizione precedente, salvare all'interno di un array la sequenza risultante (seq max: max 6 dot)

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    console.log(this.dot);
    for (var directive of this.dot) {
      console.log(directive.nativeElement.getBoundingClientRect());
      this.dotsLocation.push(directive.nativeElement.getBoundingClientRect());
      console.log(directive);
    }
    console.log(this.dotsLocation);
  }

  onClick(e: any, type: string) {
    // console.log(e.target);
    this.currentClickX = e.x;
    this.currentClickY = e.y;

    console.log(this.currentClickX, this.currentClickY);

    console.log('x:', e.x, 'y:', e.y);

    this.dotsLocation.forEach((dot) => {
      if (
        dot.x < this.currentClickX &&
        this.currentClickX < dot.x + dot.width &&
        dot.y < this.currentClickY &&
        this.currentClickY < dot.y + dot.height
      ) {
        console.log('trovato');
        console.log(dot.parentElement);
      } else {
        console.log('non trovato');
      }
    });

    // console.log(type, e.touches.item(0)?.clientX);
  }
}
