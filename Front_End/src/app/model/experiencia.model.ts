import { PersonaService } from "../service/persona.service";


export interface Experiencia {
  id:number;
  empresa:string;
  cargo:string;
  fechaIngreso:string;
  fechaEgreso:string;
  persona: PersonaService;

}
