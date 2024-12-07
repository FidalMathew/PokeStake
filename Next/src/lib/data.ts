export interface Pokemon {
    id: number;
    name: string;
    type: string;
    hp: number;
    attack: number;
    defense: number;
    image: string;
  }
  
  export const pokemonData: Pokemon[] = [
    {
      id: 1,
      name: "Bulbasaur",
      type: "Grass",
      hp: 45,
      attack: 49,
      defense: 49,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
    },
    {
      id: 2,
      name: "Charmander",
      type: "Fire",
      hp: 39,
      attack: 52,
      defense: 43,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
    },
    {
      id: 3,
      name: "Squirtle",
      type: "Water",
      hp: 44,
      attack: 48,
      defense: 65,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png"
    },
    {
      id: 4,
      name: "Pikachu",
      type: "Electric",
      hp: 35,
      attack: 55,
      defense: 40,
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
    }
  ];
  
  