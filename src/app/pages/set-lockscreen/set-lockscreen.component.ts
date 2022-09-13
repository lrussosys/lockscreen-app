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
  combinazioneEsatta = [0, 3, 4];
  combinazioneDigitata: any = [];
  counter = 0;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(()=> {
      this.addCoordinates();
    },1)
    console.log(this.dots);
  }
  onClick(dot: any, i: any) {
    this.counter++
    this.combinazioneDigitata.push(dot);
    if(this.combinazioneEsatta.length == this.combinazioneDigitata.length){
      let temp = this.combinazioneEsatta.filter((c, index)=> {
        return this.combinazioneDigitata[index].i == c
      })
      if(temp.length === this.combinazioneEsatta.length){
        console.log('trovata')
      }else{
        this.combinazioneDigitata = []
        alert('riprova')
      }
    }
    if(this.combinazioneDigitata.length > this.combinazioneEsatta.length){
      this.combinazioneDigitata = []
      alert('riprova')
    }
  
    console.log(this.combinazioneDigitata);

    this.createLine(this.combinazioneDigitata);
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
        width: elem.width,
        height: elem.height,
      };
      i++;
    });

  }

  createLine(obj:any) {
    if (this.combinazioneDigitata.length >= 2) {
      let parent: any = document.getElementById('line');

      let newDiv: any = document.createElement('div');

      parent.appendChild(newDiv)
      newDiv.style.width = (obj[1]?.x - obj[0]?.x)+'px';
      newDiv.style.height = '1px';
      newDiv.style.background = 'black';
      newDiv.style.top = (obj[0]?.top + (obj[0]?.height/2))+'px'
      newDiv.style.left = (obj[0]?.left + (obj[0]?.width/2))+'px'
      newDiv.style.position = 'fixed'

    }
  }
}
// width: calc((162.484375px) - (37.15625px));
// background-color: black;
// height: 1px;
// top: calc(261.359375px + 25px);
// left: calc(37.15625px + 25px);
// position: fixed
