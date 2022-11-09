import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Flyer } from 'src/app/models/flyer';
import { FlyerService } from 'src/app/services/flyer.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  listFlyer: Flyer[];
  year: string;

  pagina = 0;
  cantPagina = 10;

  constructor(
    private dateFormat: DatePipe,
    private flyerService: FlyerService
  ) {
    this.listFlyer = [];
  }

  ngOnInit() {
    this.year = this.dateFormat.transform(new Date(), 'yyyy');
    this.obtenerFlyer();
  }

  obtenerFlyer() {

    const nombre = null;
    const descripcion = null;

    this.flyerService.filterFlyer(nombre, descripcion, this.pagina, this.cantPagina).subscribe( resp => {
      this.listFlyer = resp.data.content;
    });
  }

}
