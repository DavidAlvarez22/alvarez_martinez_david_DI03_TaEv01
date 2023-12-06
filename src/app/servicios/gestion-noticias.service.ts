import { Article } from './../Interfaces/mi-interfaz';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObject } from '../Interfaces/mi-interfaz';

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

   // Método getLeerFichero().No recibe ninguna variable ni devuelve nada. Pero sirve para dotar de contenido a nuestro objeto RootObject. 
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

  //Función getDatosArchivoSegundaPagina(). No recibe ninguna variable y devuelve un array de la clase Article
  getDatosArchivoSegundaPagina() {
    return this.arraySegundaPagina;
    } 

  // Función insertarArticulo(). Recibe un artículo y no devuelve nada. Sirve para insertar en el array arraySegundaPagina un nuevo artículo  
  insertarArticulo(articulo : Article){

    // En primer lugar, buscaremos el artículo en nuestro objeto todo fichero a través de la función find de arrays a través de una función anónima que devuelve el artículo que coincida con el articulo pasado a nuestra función
    let articuloEncontrado : Article = this.todoFichero.articles.find(function(cadaArticulo){return cadaArticulo == articulo})!;

    // En segundo lugar creamos una variable indice que nos mostrará a través de la función indexOf la posición de nuestro artículo en el array
    let indice : number = this.todoFichero.articles.indexOf(articuloEncontrado);
    
    //Para implementar el control de artículo y que no podamos seleccionar dos veces el artículo a leer, vamos a realizar la misma búsqueda , pero en este caso en un segundo array que será el que aparezca en la página leer.
    let articuloEncontradoArrayDos = this.arraySegundaPagina.find(function(cadaArticulo){return cadaArticulo == articulo})!;

    // Buscamos el índice en este segundo array. Si no se encuentra la noticia, nos devolverá -1
    let indice2 : number = this.arraySegundaPagina.indexOf(articuloEncontradoArrayDos);

    //Estructura condicional que nos permitirá introducir solo aquellos artículos que no se encuentren en el array de noticias seleccionadas. Por eso solo permitirá que se introduzcan los artículos cuyo índice sea igual a -1, es decir, que no existean en el array  
    if (indice2 == -1){
    
      //Si no existe en el array, mediante la función push meteremos la noticia
      this.arraySegundaPagina.push(this.todoFichero.articles[indice]);
    } 
  }   
  
   // Función borrarArticulo(). Recibe la noticia y no devuelve nada. Sirve para borrar en el array arraySegundaPagina un nuevo artículo   
   borrarArticulo(articulo: Article){
    
    // buscar el artículo
    let articuloEncontrado = this.arraySegundaPagina.find(function(cadaArticulo){return cadaArticulo == articulo})!;

    // buscar el índice del articulo por el array
    let indice : number = this.arraySegundaPagina.indexOf(articuloEncontrado);

    //Estructura condicional que nos permitirá borrar solo aquellas noticias que estén en el array.
    //Si diera -1, es decir, que la noticia no existe, no haría nada. Evitamos poner -1, ya que si pasamos ese índice, al ser 
    //negativo empezaría a contar desde el final del array y borraría el de esa posición.
    if (indice != -1){
    
      //Borra el artículo con la función splice
      this.arraySegundaPagina.splice(indice,1);
    }
  }
}
  

