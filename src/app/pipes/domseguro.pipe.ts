import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';


@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

	//uris: string[] = [];
	//url: string;

  constructor( private domSanitizer:DomSanitizer ){ }

  transform( value: string): any {

  	const url = 'https://open.spotify.com/embed?uri=';

  	// Versión larga (en principio funciona igual)
  	//this.uris = value.split(":");
  	//this.url = `https://open.spotify.com/embed/${this.uris[1]}/${this.uris[2]}`;

    return this.domSanitizer.bypassSecurityTrustResourceUrl( url + value );
  }

}