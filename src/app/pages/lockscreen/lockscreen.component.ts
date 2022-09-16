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

  constructor(public patternService: PatternService, private router: Router) {}

  combinazioneEsatta = this.patternService.combinazioneCorretta;

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
    if (this.patternService.combinazioneDigitata.indexOf(dot) === -1) {
      this.patternService.combinazioneDigitata.push(dot);
      this.getLineParameters(this.patternService.combinazioneDigitata);
    }
  }

  //al touchend controlla se è la combinazione esatta o meno
  onTouchEnd() {
    let temp = this.combinazioneEsatta.filter((c: any, index: any) => {
      return this.patternService.combinazioneDigitata[index]?.i == c;
    });
    const TIMEOUTONTOUCHEND = 2000;
    if (JSON.stringify(temp) === JSON.stringify(this.combinazioneEsatta)) {
      this.patternService.combinazioneDigitata = [];
      this.patternService.correct = true;
      setTimeout(() => {
        this.patternService.correct = false;
      }, TIMEOUTONTOUCHEND);
      this.patternService.removeLines();
      this.patternService.dots.forEach((d: any) => {
        d.selected = false;
      });
    } else {
      this.patternService.combinazioneSbagliata();
      this.patternService.wrong = true;
      setTimeout(() => {
        this.patternService.wrong = false;
      }, TIMEOUTONTOUCHEND);
    }
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
