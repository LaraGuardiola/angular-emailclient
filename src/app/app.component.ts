import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emailclient';

  resize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.body.style.setProperty('height', `${vh * 100}px`);
    console.log(vh * 100)
  }

  ngOnInit() {
    window.addEventListener('load', this.resize)
    window.addEventListener('resize', this.resize)
  }
 
}
