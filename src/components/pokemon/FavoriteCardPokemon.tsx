import { Card } from "@nextui-org/react"
import { FC } from "react"
import { useRouter } from 'next/router';

interface Props {
    pokemonId: number
}

const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {

    const router = useRouter()

    const onFavoriteClick = () => {
        
        router.push(`/pokemon/${pokemonId}`)

    }

    return ( 
        <Card isHoverable isPressable css={{ padding: 10 }} onPress={ onFavoriteClick }>
            <Card.Image 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemonId }.svg`} 
                width={'100%'}
                height={ 140 }
            />
        </Card>
    )
}
 
export default FavoriteCardPokemon