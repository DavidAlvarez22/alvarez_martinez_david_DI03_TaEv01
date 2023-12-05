import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, RootObject } from '../Interfaces/mi-interfaz';




@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasService {

   //Definimos el objeto todoFichero que será de la clase RootObject y lo inicializamos
   private todoFichero : RootObject= {
    "status": "",
    "totalResults": 0,
    "articles" : []
   };
   
  

  // Definimos el objeto articles que será un array de la clase Article y lo iniciamos
 
   private articles : Article[]=[];

  // Definimos el objeto arraySegundaPagina que será un array de la clase Article y lo iniciamos
  private arraySegundaPagina : Article[] = [];

  //Dentro del constructor introduciremos el objeto leerfichero que será de la clase HttpClient. Esto nos permitirá leer el archivo json.
  constructor(private leerFichero: HttpClient) {
    //Llamamos al método getleerFichero que nos permitirá leer el fichero json
    this.getLeerFichero();

   }

   // Método getLeerFichero().No recibe ninguna variable ni devuelve nada. Pero srive para dotar de contenido a nuestro objeto RootObject. 
  getLeerFichero(){
    
    //Definimos el objeto datosFichero que será un objeto de Observable de la clase RootObject
    let datosFichero: Observable<RootObject>;

    //Nuestro objeto utilizará la función get de la clase httpClient que hemos definido en el constructor, para lo cual le debemos pasar la url del archivo a leer
    datosFichero =this.leerFichero.get<RootObject>("/assets/datos/articulos.json");

    //Finalmente mediante una función arrow, los datos del objeto datosFichero los introduciremos en nuestro objeto todoFichero que hemos creado al inicio
    datosFichero.subscribe(datos =>{
      this.todoFichero = datos;
    });
  }

  //Función getDatosArchivo(). No recibe ninguna variable y devuelve un array de la clase Article
  getDatosArchivo() {
    return this.todoFichero.articles;
      }
}
