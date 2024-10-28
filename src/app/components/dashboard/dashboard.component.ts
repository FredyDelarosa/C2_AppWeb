import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {CommonModule} from '@angular/common';
import { withDebugTracing } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog-component/confirm-dialog-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    PipesModule
  ],
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre_reportante', 'area_equipo', 'propietario_equipo', 'actions'];
  dataSource = new MatTableDataSource<Reporte>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getData();
  }

  getData() {
    this.http.get<Reporte[]>('http://localhost:8000/api/reportes')
      .subscribe(data => {
        this.dataSource.data = data;
      }, error => {
        console.error('Error fetching data', error);
      });
  }

  actualizar(element: Reporte) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { ...element }, // Enviar los datos actuales del elemento
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Hacer la solicitud PUT para actualizar los datos
        this.http.put(`http://localhost:8000/api/reportes/${element.id}`, result).subscribe(() => {
          this.getData(); // Refrescar los datos
        }, error => {
          console.error('Error al actualizar', error);
        });
      }
    });
  }

  eliminar(element: Reporte) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { id: element.id, nombre: element.nombre_reportante }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Cambia la interpolación aquí
        this.http.delete(`http://localhost:8000/api/reportes/${element.id}`).subscribe(() => {
          this.getData(); // Recargar los datos después de la eliminación
        }, error => {
          console.error('Error deleting data', error);
        });
      }
    });
  }

  verTodo(element:Report){
    const dialogRef = this.dialog.open(DialogComponent,{
      data: element
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log('El dialog fue cerrado')
    })
  }

}

export interface Reporte {
  id: number;
  nombre_reportante: string;
  area_equipo: string;
  propietario_equipo: string;
}
