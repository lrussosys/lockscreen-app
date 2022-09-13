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
  combinazioneEsatta = [3, 5, 6];
  combinazioneDigitata: any = [];

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.addCoordinates();
    console.log(this.dots);
  }
  onClick(dot: any, i: any) {
    if (!this.combinazioneDigitata.includes(dot)) {
      this.combinazioneDigitata.push(dot);
    }
    console.log(this.combinazioneDigitata);
    if (
      JSON.stringify(this.combinazioneDigitata) ==
      JSON.stringify(this.combinazioneEsatta)
    ) {
      console.log('esatta');
    }

    this.createLine()
  }

  addCoordinates() {
    this.dot.forEach((HTMLel, i = 0) => {

      let elem = HTMLel.nativeElement.getBoundingClientRect();
      console.log(elem);

      this.dots[i] = {
        i: i,
        x: elem.x,
        y: elem.y,
        top: elem.top,
        bottom: elem.bottom,
        right: elem.right,
        left: elem.left,
        width:elem.width,
        height: elem.height
      };
      i++
    });
  }

  createLine(){

    if( this.combinazioneDigitata.length >= 2){

      let parent:any = document.getElementById('line')
      
         let newDiv:any = document.createElement('div')
       
         parent.appendChild(newDiv)
         newDiv.style.width = '100px'
         newDiv.style.height = '100px'
         newDiv.style.background = 'red'
         
    }


  }


}
