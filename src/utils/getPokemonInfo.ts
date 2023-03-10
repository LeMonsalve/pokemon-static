import pokeApi from "@/api/pokeApi";
import {Pokemon} from "@/interfaces/pokemon-full";

export async function getPokemonInfo( nameOrId: string ) {
    try {

        return await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`).then(response => ({
            id: response.data.id,
            name: response.data.name,
            sprites: response.data.sprites
        }))

    } catch (e) {
        return null
    }
}