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
  selector: 'app-set-lockscreen',
  templateUrl: './set-lockscreen.component.html',
  styleUrls: ['./set-lockscreen.component.css'],
})
export class SetLockscreenComponent implements OnInit, AfterViewInit {
  @ViewChildren('dot') dot!: QueryList<ElementRef>;

  constructor(public patternService: PatternService, private router: Router) {}

  combinazioneEsatta = [];
  combinazioneDigitata: any = [];
  newDiv!: any;
  linesCollection!: any;
  currentValue: any;

  correct: boolean = false;
  wrong: boolean = false;

  transitionTiming = 'all 0.1s linear';

  ngOnInit(): void {
    this.patternService.patternSet = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.addCoordinates();
    }, 1);
  }

  onClick(dot: any, i: any, e: any) {
    dot.selected = true;

    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;

    if (document.elementFromPoint(x, y)?.classList.contains('innerDot')) {
      let elem: any = document?.elementFromPoint(x, y)?.innerHTML;
      let e = parseInt(elem);
      dot = this.patternService.dots[e];
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
    let tempArray: any = [];
    this.combinazioneDigitata.forEach((d: any) => {
      tempArray.push(d.i);
    });

    this.patternService.combinazioneCorretta = tempArray;

    this.patternService.patternSet = true;

    setTimeout(() => {
      this.router.navigate(['lockscreen']);
    }, 2000);
  }

  // trova le coordinate e le mette dell`oggetto dots
  addCoordinates() {
    this.dot.forEach((HTMLel, i = 0) => {
      let elem = HTMLel.nativeElement.getBoundingClientRect();

      this.patternService.dots[i] = {
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
        this.patternService.createLine();

        if (secondClick.x > firstClick.x) {
          // fa la linea verso destra
          this.patternService.lineaVersoDestra(secondClick, firstClick);
        } else {
          // fa la linea verso sinistra
          this.patternService.lineaVersoSinistra(secondClick, firstClick);
        }
        this.patternService.stileLineaOrizontale(firstClick);

        // verticale
      } else if (secondClick.x == firstClick.x) {
        this.patternService.createLine();

        // linea verso basso
        if (secondClick.y > firstClick.y) {
          this.patternService.lineaVersoBasso(secondClick, firstClick);

          // linea verso alto
        } else {
          this.patternService.lineaVersoAlto(secondClick, firstClick);
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
        this.patternService.createLine();

        // calcolo distanza tra due punti
        let distance = this.patternService.distanzaTraDuePunti(
          secondClick,
          firstClick
        );

        this.patternService.newDiv.style.transition = this.transitionTiming;
        this.patternService.newDiv.style.width = '4px';
        this.patternService.newDiv.style.height = '0px';

        setTimeout(() => {
          this.patternService.newDiv.style.height = distance + 'px';
        }, 1);

        this.patternService.stileDiagonale(firstClick, inclination);
      }
    }
  }
}
