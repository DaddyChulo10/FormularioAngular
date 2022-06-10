import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Gears 5', Validators.required],
      ['Gears of War 4'],
    ], Validators.required)
  })

  nuevoFavorito: FormControl = this.fb.control('', Validators.required)

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  camposInvalidos(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) {
      return
    }
    // this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required))
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required))
    this.nuevoFavorito.reset()
  }

  eliminarCampo(i :number){
    this.favoritosArr.removeAt(i)
  }

  guardar() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched()
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset()
  }
}
