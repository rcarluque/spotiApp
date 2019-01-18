import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
	// Al usar este decorador, Angular detecta que el servicio ha sido declarado
	// por lo que no hace falta añadirlo al app.module
  providedIn: 'root'
})
export class SpotifyService {

  clientId = "53efe79b85c64006a5af2eb5bd475647";
  clientPriv = "c786d296938d414e8301d30b9e09150d";

  constructor(private http:HttpClient) { }

  getToken() {
    return this.http.get(`http://spotify-get-token.herokuapp.com/spotify/${this.clientId}/${this.clientPriv}`)
          .pipe( map( data => data['access_token']) );
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    
    // Con la propiedad MergeMap en vez de map, conseguimos que en el filtrado combine el Observable del primer return con el observable
    // del segundo return y solamente devuelva un 'Observable<Object>' en vez de 'Observable<Observable<Object>>'
    return this.getToken().pipe( mergeMap( token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` 
      });      
      
      return this.http.get(url, {headers});
    })); 
  }

  getUltimosLanzamientos() {
    return this.getQuery('browse/new-releases?limit=20').pipe( map( data => {
      return data['albums'].items;
    }));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe( map( data => data['artists'].items ));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
          .pipe( map( data => data['tracks'] ) );
  }

}
