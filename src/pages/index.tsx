import {GetStaticProps, NextPage} from "next";

import DarkLayout from "@/components/layouts/DarkLayout";
import pokeApi from "@/api/pokeApi";
import {PokemonListResponse, SmallPokemon} from "@/interfaces/pokemon-list";
import {Grid} from "@nextui-org/react";
import PokemonCard from "@/components/pokemon/PokemonCard";

interface Props {
    pokemons: SmallPokemon[]
}

const Home: NextPage<Props> = ({ pokemons }) => {

    return (
        <DarkLayout title="Pokemon List" >

            <Grid.Container gap={ 2 } justify="flex-start" >
                {
                    pokemons.map((pokemon) => (
                        <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
                    ))
                }
            </Grid.Container>

        </DarkLayout>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const results = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151').then(response => response.data.results)

    const pokemons: SmallPokemon[] = results.map((pokemon, i) => ({
        ...pokemon,
        id: i + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1 }.svg`
    }))

    return {
        props: {
            pokemons
        }
    }
}

export default Home
