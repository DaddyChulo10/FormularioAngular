import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  inirForm = {
    producto: '',
    precio: 0,
    existencias: 0,
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean {
    //miFormulario.controls['producto']?.invalid && miFormulario.controls['producto']?.touched
    return this.miFormulario?.controls['producto']?.invalid && this.miFormulario?.controls['producto']?.touched
  }

  precioValido(): boolean {
    return this.miFormulario?.controls['precio']?.invalid && this.miFormulario?.controls['precio']?.value < 0
  }

  guardar() {
    console.log(this.miFormulario);
    this.miFormulario.resetForm({
      precio: 0,
      existencias: 0,
    });
  }

}
