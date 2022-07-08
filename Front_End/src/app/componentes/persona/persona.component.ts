import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  public personas: Persona[] = [];
  public editPersona!: Persona;
  public deletePersona!: Persona;

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.getPersonas();

  }
    public getPersonas(): void {
      this.personaService.getPersonas().subscribe({
        next: (response: Persona[]) => {
          this.personas = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }

    public onAddPersona(addForm: NgForm): void{
      document.getElementById("add-persona-form")!.click();
      this.personaService.addPersona(addForm.value).subscribe({
        next: (response: Persona) => {
          console.log(response);
          this.getPersonas();
          addForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      });
    }
    public onUpdatePersona(persona: Persona): void{
      this.personaService.updatePersona(persona).subscribe({
        next: (response: Persona) => {
          console.log(response);
          this.getPersonas();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }

  public onDeletePersona(personaId: number): void {
    this.personaService.deletePersona(personaId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getPersonas();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  public onOpenModal(persona: Persona, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPersonaModal');
    }
    if (mode === 'edit') {
      this.editPersona = persona;
      button.setAttribute('data-target', '#updatePersonaModal');
    }
    if (mode === 'delete') {
      this.deletePersona = persona;
      button.setAttribute('data-target', '#deletePersonaModal');
    }
    container?.appendChild(button);
    button.click();
  }


  }
