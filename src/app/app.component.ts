import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  date: any;
  now: any;
  difference: number;
  finalEndDate: any =  new Date();
  redTime: number;
  yellowTime: number;
  timeOver: boolean;



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


    if (this.hours.nativeElement.innerText < 1 && this.minutes.nativeElement.innerText < this.yellowTime) {
      if (this.minutes.nativeElement.innerText < this.redTime) {
        console.log("READ");
        this.color = "red";
      }
      else {
        this.color = "yellow";
      }
    } else {
      this.color = "green";
    }
    if(this.seconds.nativeElement.innerText == 0 && this.hours.nativeElement.innerText==0 && this.minutes.nativeElement.innerText==0){
      this.playAudio();
      this.timeOver = true;
    }

    return this.timeOver;
  }


  getInputs(h: any, m: any, s: any, gelb: any, rot: any) {
    this.finalEndDate = new Date();
    //convert Input from String to Number
    let H = +h;
    let M = +m;
    let S = +s;
    this.redTime = +rot;
    this.yellowTime = +gelb;
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
    let audio = new Audio();
    audio.src = "../../../assets/sounds/ukulele.mp3";
    audio.load();
    audio.play();
  }
}