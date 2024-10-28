// pipes/pipes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizarPipe } from './capitalizar.pipe';

@NgModule({
  declarations: [CapitalizarPipe],
  imports: [CommonModule],
  exports: [CapitalizarPipe] 
})
export class PipesModule {}
