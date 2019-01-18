import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(images: any[]): string {
  	// No existe imagenes o viene vacio
  	if(!images) {
  		return 'assets/img/noimage.png';
  	}
  	// Devuelve un array pero viene vacio
  	if( images.length > 0) {
  		return images[0].url;
  	} else {
  		return 'assets/img/noimage.png';
  	}

  }

}
