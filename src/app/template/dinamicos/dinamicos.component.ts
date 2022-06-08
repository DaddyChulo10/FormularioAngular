import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Persona {
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  @ViewChild('formularioOtro') formularioOtro!: NgForm;

  constructor() { }

  nuevoJuego: string = ''

  persona: Persona = {
    nombre: 'Edgar',
    favoritos: [
      { id: 1, nombre: 'Gears 5' },
      { id: 2, nombre: 'OverWatch' },
    ]
  }


  validarNombre(): boolean {
    return this.formularioOtro?.controls['nombre']?.invalid && this.formularioOtro?.controls['nombre']?.touched
  }

  eliminar(i: number) {
    this.persona.favoritos.splice(i, 1);
  }

  agregarJuego() {
    const nuevoJuego: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoJuego});
    this.nuevoJuego = "";
  }

  guardar() {

  }

}
