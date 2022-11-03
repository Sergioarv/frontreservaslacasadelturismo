import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  year: string;

  constructor(
    private dateFormat: DatePipe,
  ) { }

  ngOnInit() {
    this.year = this.dateFormat.transform(new Date(), 'yyyy');
  }

}
