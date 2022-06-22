import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {
  public experiencia: Experiencia[] = [];
  public editExperiencia!: Experiencia;
  public deleteExperiencia!: Experiencia;





  constructor(private experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    this.getExperiencias();
  }

    public getExperiencias (): void{
      this.experienciaService.getExperiencias().subscribe(
        (response:Experiencia[])=> {
          this.experiencia= response;
        },
        (error: HttpErrorResponse)=> {
          alert(error.message);
        }
    );
  }

  public onAddExperiencia(addForm: NgForm):void {
    document.getElementById('add-experiencia-modal')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe(
      (response: Experiencia) => {
        console.log(response);
        this.getExperiencias();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )

  }

  public onUpdateExperiencia(experiencia: Experiencia):void {
    this.experienciaService.updateExperiencia(experiencia).subscribe(
    (response: Experiencia) => {
      console.log(response);
      this.getExperiencias();

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )

}

public onDeleteExperiencia(id: number):void {
  this.experienciaService.deleteExperiencia(id).subscribe(
  (response: void) => {
    console.log(response);
    this.getExperiencias();

  },
  (error: HttpErrorResponse) => {
    console.log(error.message);
  }
)

}

  public onOpenModal(experiencia: Experiencia, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute ('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExperienciaModal');
    }
    if (mode === 'edit') {
      this.editExperiencia = experiencia;
      button.setAttribute('data-target', '#updateExperienciaModal');
    }
    if (mode === 'delete') {
      this.deleteExperiencia = experiencia;
      button.setAttribute('data-target', '#deleteExperienciaModal');
    }
    container?.appendChild(button);
    button.click();
  }
  }





