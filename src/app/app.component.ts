import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      switch  (event.key) {
          case 'Escape':
            this.soundPlayer.pause();
              break;
      }
  }

  date: any;
  now: any;
  difference: number;
  finalEndDate: any =  new Date();
  redMin: number;
  redSek:number;
  yellowMin: number;
  yellowSek:number
  timeOver: boolean;


  soundPlayer = new Audio("../../../assets/sounds/ukulele.mp3");

  color: any;


  @ViewChild('days', { static: true }) days: ElementRef;
  @ViewChild('hours', { static: true }) hours: ElementRef;
  @ViewChild('minutes', { static: true }) minutes: ElementRef;
  @ViewChild('seconds', { static: true }) seconds: ElementRef;

  ngAfterViewInit() {
    this.hours.nativeElement.innerText = "00";
    this.minutes.nativeElement.innerText = "00";
    this.seconds.nativeElement.innerText = "00";
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();

    let difference = Math.floor((this.finalEndDate.getTime() - this.now)/1000);
    let stunden = Math.floor((difference - (difference % (60*60)))/3600);
    difference = difference - stunden * 3600;
    let minuten = Math.floor((difference - (difference % (60)))/60);
    difference = Math.floor(difference - minuten * 60)

    

    this.hours.nativeElement.innerText = String(stunden).padStart(2,'0');
    this.minutes.nativeElement.innerText = String(minuten).padStart(2,'0');
    this.seconds.nativeElement.innerText = String(difference).padStart(2,'0');


    if (this.hours.nativeElement.innerText < 1 && this.minutes.nativeElement.innerText <= this.yellowMin && this.seconds.nativeElement.innerText <= this.yellowSek) {
      if (this.minutes.nativeElement.innerText <= this.redMin && this.seconds.nativeElement.innerText <= this.redSek) {
        this.color = "#E30018";
        if(this.redSek<61){
          this.redSek = 61;
        }
        
      }
      else {
        this.color = "#FFC779";
        if(this.yellowSek<61){
          this.yellowSek = 61;
        }
      }
    } else {
      this.color = "#51A556";
    }
    if(this.seconds.nativeElement.innerText == 0 && this.hours.nativeElement.innerText==0 && this.minutes.nativeElement.innerText==0){
      this.color = "#E30018";
      this.playAudio();
      this.timeOver = true;
    }

    return this.timeOver;
  }


  getInputs(h: any, m: any, s: any, yellowM: any,yellowS:any, redM: any, redS: any) {

    if(this.soundPlayer.currentTime !== 0){
      this.soundPlayer.pause();
      this.soundPlayer.currentTime = 0;
    }

    this.finalEndDate = new Date();
    //convert Input from String to Number
    let H = +h;
    let M = +m;
    let S = +s;
    this.redMin = +redM;
    this.redSek = +redS;
    this.yellowMin = +yellowM;
    this.yellowSek = +yellowS;
    this.now = this.finalEndDate.getTime();
    
    this.finalEndDate.setHours(this.finalEndDate.getHours() + H);
    this.finalEndDate.setMinutes(this.finalEndDate.getMinutes() + M);
    this.finalEndDate.setSeconds(this.finalEndDate.getSeconds() + S);

    setInterval(() => {
      this.tickTock();
      this.difference = this.finalEndDate.getTime() - this.now;
      this.difference = this.difference / (1000 * 60 * 60 * 24);

    }, 1000);


  }




  reset(){
    window.location.reload();
  }

  playAudio(){
this.soundPlayer.play();
  }

  stopMusic(){
    
  }
}