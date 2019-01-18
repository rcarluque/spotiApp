import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent {

	artista:any = {};
	tracks: any[] = [];
	loading: boolean;

	constructor(private router:ActivatedRoute, private spotify: SpotifyService) { 

  	this.loading = true;
  	this.router.params.subscribe( params => {
  		this.getDataArtista(params['id']);
  	});

  }

  getDataArtista(id: string) {
  	this.spotify.getArtista(id).subscribe( artista => {
  		this.artista = artista;
  		this.loading = false;
  	}, (errorObtenido) => {
  		console.log(errorObtenido.error.error.message);
  	});
  	this.spotify.getTopTracks(id).subscribe( tracks => this.tracks = tracks);
  }

}
