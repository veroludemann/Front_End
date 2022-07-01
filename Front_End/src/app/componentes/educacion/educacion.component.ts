import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/service/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  public educaciones!: Educacion[];
  public editEducacion!: Educacion;
  public deleteEducacion!: Educacion;


  constructor(private educacionService: EducacionService) { }

  ngOnInit() {
    this.getEducaciones();
  }

  public getEducaciones(): void {
    this.educacionService.getEducaciones().subscribe({
      next: (response: Educacion[]) => {
        this.educaciones = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onAddEducacion(addForm: NgForm): void{
    document.getElementById("add-educacion-form")!.click();
    this.educacionService.addEducacion(addForm.value).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.getEducaciones();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onUpdateEducacion(educacion: Educacion): void{
    this.educacionService.editEducacion(educacion).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.getEducaciones();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onDeleteEducacion(educacionId: number): void {
    this.educacionService.deleteEducacion(educacionId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getEducaciones();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }




  public onOpenModal(educacion:Educacion, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addEducacionModal');
    }
    if (mode === 'edit'){
      this.editEducacion = educacion;
      button.setAttribute('data-target', '#updateEducacionModal');
    }
    if (mode === 'delete'){
      this.deleteEducacion = educacion;
      button.setAttribute('data-target', '#deleteEducacionModal');
    }
    container?.appendChild(button);
    button.click();

  }




}
