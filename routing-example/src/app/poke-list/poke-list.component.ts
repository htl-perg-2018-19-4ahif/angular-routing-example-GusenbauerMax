import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IPokeResults { count: number, results: IPokemon [] };
interface IPokemon { name: String, url: String };

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {
  pokemonList: IPokemon[];
  pokemonFilter: string = "";

  constructor(private httpClient: HttpClient) { 
    this.loadPokemons();
  }

  ngOnInit() {
  }

  async loadPokemons(){
    const count: number = (await this.httpClient
      .get<IPokeResults>('https://pokeapi.co/api/v2/pokemon/')
      .toPromise()).count;
    this.pokemonList = (await this.httpClient
      .get<IPokeResults>(`https://pokeapi.co/api/v2/pokemon/?limit=${count}`)
      .toPromise()).results;
    if (this.pokemonFilter != ""){
      this.pokemonList = this.pokemonList.filter(pokemon => pokemon.name.includes(this.pokemonFilter));
    }
  }

}
