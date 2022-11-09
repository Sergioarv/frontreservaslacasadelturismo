import { Component, OnInit } from '@angular/core';
import { Flyer } from 'src/app/models/flyer';
import { FlyerService } from 'src/app/services/flyer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listFlyer: Flyer[];

  constructor(
    private flyerService: FlyerService
  ) {
    this.listFlyer = [];
  }

  ngOnInit() {
    this.obtenerFlyer();
  }

  obtenerFlyer() {
    this.flyerService.getFlyer().subscribe( resp => {
      this.listFlyer = resp.data;
    });
  }
}
