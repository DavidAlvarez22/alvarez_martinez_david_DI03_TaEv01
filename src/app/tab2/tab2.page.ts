import { Component } from '@angular/core';
import { GestionNoticiasService } from '../servicios/gestion-noticias.service';
import { AlertController } from '@ionic/angular';
import { Article } from '../Interfaces/mi-interfaz';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  /* Dentro de nuestro constructor creamos un objeto que será de la clase de nuestro servicio.A su vez,
  crearemos el objeto alerta, que es de tipo AlertController, lo que nos permitirá sacar el recuadro de aviso*/
  constructor(public gestionDatos : GestionNoticiasService,private alerta: AlertController) {}

  onClick(articulo : Article){
    this.presentAlertConfirm(articulo);
  }

  // Método asíncrono PresentAlertConfirm. Recibe un artículo. Y si se pulsa el botón ok para confirmar el mensaje, llama al método borrarArticulo de nuestro servicio
async presentAlertConfirm(articulo:Article) {
  const alert = await this.alerta.create({
    cssClass: 'my-custom-class',
    header: 'Confirmar',
    message: 'Borrar Noticia<!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.gestionDatos.borrarArticulo(articulo);
          console.log('Confirm Okay');
        }
      }
    ]
  });

  await alert.present();
}

}
