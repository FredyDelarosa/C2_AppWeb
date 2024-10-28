import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog-component/confirm-dialog-component.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class SearchComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre_reportante', 'area_equipo', 'propietario_equipo', 'actions'];
  dataSource = new MatTableDataSource<Reporte>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getData();
  }

  getData() {
    this.http.get<Reporte[]>('http://localhost:8000/api/reportes').subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Eliminar espacios y convertir a minúsculas
  }

  actualizar(element: Reporte) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.put(`http://localhost:8000/api/reportes/${element.id}`, result).subscribe(
          () => {
            this.getData(); // Refrescar los datos
          },
          (error) => {
            console.error('Error al actualizar', error);
          }
        );
      }
    });
  }

  eliminar(element: Reporte) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { id: element.id, nombre: element.nombre_reportante },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.delete(`http://localhost:8000/api/reportes/${element.id}`).subscribe(
          () => {
            this.getData(); // Recargar los datos después de la eliminación
          },
          (error) => {
            console.error('Error deleting data', error);
          }
        );
      }
    });
  }

  verTodo(element: Reporte) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('El dialog fue cerrado');
    });
  }
}

export interface Reporte {
  id: number;
  nombre_reportante: string;
  area_equipo: string;
  propietario_equipo: string;
}
