/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flyer } from 'src/app/models/flyer';
import { FlyerService } from 'src/app/services/flyer.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  imagen: any = null;
  imagenMin: any;
  imagenPregunta: any;

  regTexto = '^[a-zA-ZÀ-ÿ]+[a-zA-ZÀ-ÿ\u00f1\u00d1\u0020-\u003f\u00bf\u00a1]*[a-zA-ZÀ-ÿ]$';
  regTextoUnaLinea = '^[a-zA-ZÀ-ÿ\u00f1\u00d1\u0021-\u003f\u00bf\u00a1]+.[a-zA-ZÀ-ÿ\u00f1\u00d1\u0020-\u003f\u00bf\u00a1]*[a-zA-ZÀ-ÿ\u00f1\u00d1\u0021-\u003f\u00bf\u00a1]$';

  createFlyerForm = new FormGroup({
    nombre: new FormControl('', [Validators.pattern(this.regTexto)]),
    descripcion: new FormControl('', [Validators.pattern(this.regTextoUnaLinea)]),
    archivo: new FormControl('')
  });

  constructor(
    private router: Router,
    private flyerService: FlyerService
  ) { }

  ngOnInit(

  ) {
  }

  createFlyer() {
    const newFlyer = new Flyer();
    newFlyer.nombre = this.createFlyerForm.controls.nombre.value;
    newFlyer.descripcion = this.createFlyerForm.controls.descripcion.value;

    this.flyerService.createFlyer(this.imagen, newFlyer).subscribe( resp => {
      if(resp.success){
      // Toarts
      this.quitarImagen();
      this.resetCreateForm();
      // cargando = false
      this.router.navigate(['/flyer']);
      } else {
        // Toarts
        // Cargando
      }
    }, error => {
      // Toarts
    });
  }

  resetCreateForm() {
    this.createFlyerForm.reset();
    this.quitarImagen();
    this.router.navigate(['/flyer']);
  }

  seleccionarImagen(event: any): any {
    // this.cargando = true;
    if (event.target.files && event.target.files[0]) {
      this.imagen = event.target.files[0];
      if (this.imagen.size < 2000000) {
        const fr = new FileReader();
        fr.onload = (evento: any) => {
          this.imagenMin = evento.target.result;
        };
        fr.readAsDataURL(this.imagen);
      } else {
        this.quitarImagen();
        // this.toastrService.info('Ha superado el tamaño de la imagen, debe pesar menos de ' + 1500000/1000000 + 'Mb', 'Atención')
      }
      // this.cargando = false;
    } else {
      this.quitarImagen();
      // this.cargando = false;
    }
  }

  quitarImagen() {
    this.imagenPregunta = null;
    this.createFlyerForm.get('archivo')?.setValue('');
    this.resetearImagenSeleccionada();
  }

  resetearImagenSeleccionada() {
    this.imagen = null;
    this.imagenMin = null;
  }

}
