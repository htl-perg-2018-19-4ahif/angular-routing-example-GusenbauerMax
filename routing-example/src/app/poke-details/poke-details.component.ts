import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface IPokemon { name: string, abilities: IAbilities [] };
interface IAbilities { is_hidden: boolean, slot: number, ability: IAbility };
interface IAbility { name: string, url: string };

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.css']
})
export class PokeDetailsComponent implements OnInit {
  public pokemonName: string;
  public pokemon: IPokemon;
  public abilities: IAbilities[];

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {  }

  async ngOnInit() {
    this.route.params.subscribe(async (params) => (this.pokemonName = params.name));
    this.loadPokemonData();
  }

  async loadPokemonData(){
    this.pokemon = await this.httpClient
      .get<IPokemon>(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`)
      .toPromise();
  }

}
