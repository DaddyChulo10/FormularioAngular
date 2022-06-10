import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'ABC',
      precio: 0,
    })
  }

  // miFormulario: FormGroup = new FormGroup({
  //   'nombre': new FormControl('MacBook Air'),
  //   'precio': new FormControl(1300),
  //   'existencias': new FormControl(21221)
  // })

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]]
  })
  constructor(private fb: FormBuilder) { }

  camposInvalidos(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched()
      return;
    }
    console.log(this.miFormulario.value)
    this.miFormulario.reset()
  }
}
