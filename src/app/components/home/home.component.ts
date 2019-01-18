import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) {
    // Al iniciar el constructor estará cargando
    this.loading = true;

    //this.spotify.getToken();

    this.spotify.getUltimosLanzamientos().subscribe( data => this.nuevasCanciones = data );
    // Cuando acabe de recibir los datos del servicio ya habrá cargado.
    this.loading = false;
  }

  ngOnInit() {
  }

}
