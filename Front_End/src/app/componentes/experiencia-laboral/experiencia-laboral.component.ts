import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/service/experiencia.service';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {
  public experiencias: Experiencia[]=[];

  constructor(private experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    this.getExperiencias();
  }

  public getExperiencias (): void{
    this.experienciaService.getExperiencias().subscribe({
      next:(Response:Experiencia[])=> {
        this.experiencias= Response;
      },
      error:(error: HttpErrorResponse)=> {
        alert(error.message);
      }
  });
    }
}

