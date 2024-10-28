import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CacheService } from '../../service/cache.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule
  ]
})
export class ReportListComponent implements AfterViewInit {
verTodo(_t56: any) {
throw new Error('Method not implemented.');
}
eliminar(_t56: any) {
throw new Error('Method not implemented.');
}
actualizar(_t56: any) {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = ['id', 'nombre_reportante', 'area_equipo', 'propietario_equipo', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cacheService: CacheService) {}

  ngAfterViewInit() {
    this.loadCachedReports();
  }

  loadCachedReports(): void {
    const cachedData = this.cacheService.get('reportes');
    if (cachedData) {
      this.dataSource.data = cachedData; 
      this.dataSource.paginator = this.paginator; 
    } else {
      console.log('No hay datos en caché.');
    }
  }
}
