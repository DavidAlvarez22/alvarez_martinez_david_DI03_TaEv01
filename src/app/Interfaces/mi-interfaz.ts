//Clases que se van a usar en nuestro ejercicio.

//Exportamos la clase RootObject
export interface RootObject {
    status: string;
    totalResults: number;
    articles: Article[];
  }
  
  //Exportamos la clase RootObject
  export interface Article {
    source: Source;
    author?: string;
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
  }
  
  interface Source {
    id?: string;
    name: string;
  }