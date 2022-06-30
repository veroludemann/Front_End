import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/service/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  public educaciones!: Educacion[];


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




}
