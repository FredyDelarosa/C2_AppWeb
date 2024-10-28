import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reactivo',
  templateUrl: './reactivo.component.html',
  styleUrls: ['./reactivo.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class ReactivoComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      nombre_reportante: ['', Validators.required],
      area_equipo: ['', Validators.required],
      propietario_equipo: ['', Validators.required],
      descripcion_falla: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const reportData = this.form.value;

      this.http.post('http://localhost:8000/api/reportes', reportData)
        .subscribe({
          next: (response) => {
            console.log('Reporte enviado', response);
            this.form.reset(); // Reiniciar el formulario después de enviar
          },
          error: (error) => {
            console.error('Error al enviar el reporte', error);
          }
        });
    } else {
      console.log('Formulario no es válido');
    }
  }
}
