import { PersonaService } from "../service/persona.service";


export interface Experiencia {
  id:number;
  empresa:string;
  cargo:string;
  FechaIngreso:string;
  FechaEgreso:string;
  persona: PersonaService;

}
