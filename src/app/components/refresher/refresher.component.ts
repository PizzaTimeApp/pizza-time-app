import { Component, OnInit, Input } from '@angular/core';
import { MyPage } from '../../../../www/vendor';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss'],
})
export class RefresherComponent implements OnInit {

  @Input() callbackFunction: (args: any) => void;

  constructor() { }

  ngOnInit() {}


  doRefresh(event, delay = 2000) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, delay);
  }

}
