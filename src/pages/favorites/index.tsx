import {NextPage} from "next"
import DarkLayout from "@/components/layouts/DarkLayout"
import { NoFavorites } from '@/components/ui/NoFavorites'
import { useState, useEffect } from 'react';
import { localFavorites } from '@/utils';
import FavoritePokemons from "@/components/pokemon/FavoritePokemons";

const Favorites: NextPage = () => {

    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        
        setFavoritePokemons( localFavorites.pokemons() )

    }, [])

    return (
        <DarkLayout title="Favorite Pokemons">

            {
                favoritePokemons.length === 0 
                ? ( <NoFavorites />) 
                : ( <FavoritePokemons pokemons={ favoritePokemons } /> )   
            }

        </DarkLayout>
    )
}

export default Favorites