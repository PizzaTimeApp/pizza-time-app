import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss'],
})
export class CardImageComponent implements OnInit {

  @Input() pizza;

  constructor() { }

  ngOnInit() {}

}
