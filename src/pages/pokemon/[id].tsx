import {GetStaticPaths, GetStaticProps, NextPage} from "next"
import {Pokemon} from "@/interfaces/pokemon-full"
import DarkLayout from "@/components/layouts/DarkLayout"
import {Button, Card, Grid, Text, Image, Container} from "@nextui-org/react"
import {getPokemonInfo, helpers, localFavorites} from "@/utils"
import {useEffect, useState} from "react";
import confetti from "canvas-confetti"

interface Props {
    pokemon: Pokemon
}

const Pokemon: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState( false )

    useEffect(() => {
        setIsInFavorites( localFavorites.existsInFavorites( pokemon.id ) )
    }, [])

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite( pokemon.id )
        
        setIsInFavorites( !isInFavorites )

        if ( isInFavorites ) return

        // Confetti animation when the Pokémon is aggregated to favorites
        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })
    }


    return (
        <DarkLayout title={`${helpers.capitalizeFirstLetterUpper( pokemon.name )} Pokemon`} >

            <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
                <Grid xs={ 12 } sm={ 4 } >
                    <Card isHoverable css={{ padding: '30px' }} >
                        <Card.Body>
                            <Card.Image
                                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                                alt={pokemon.name}
                                width='100%'
                                height={ 200 }
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={ 12 } sm={ 8 } >
                    <Card css={{ padding: '10px' }}>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }} >
                            <Text h1 transform="capitalize" >{ pokemon.name }</Text>
                            <Button
                                color="gradient"
                                ghost={ !isInFavorites }
                                onPress={ onToggleFavorite }
                            >
                                { !isInFavorites ? 'Add to favorites' : 'In Favorites' }
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={ 30 } >Sprites:</Text>

                            <Container display="flex" direction="row" gap={ 0 } >
                                <Image
                                    src={ pokemon.sprites.front_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image
                                    src={ pokemon.sprites.back_default }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image
                                    src={ pokemon.sprites.front_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                                <Image
                                    src={ pokemon.sprites.back_shiny }
                                    alt={ pokemon.name }
                                    width={ 100 }
                                    height={ 100 }
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>

        </DarkLayout>
    )
}

export const getStaticPaths: GetStaticPaths = () => {

    const pokemons151 = [...Array(151)].map((_, index) => `${ index + 1 }`)

    return {
        paths: pokemons151.map(id => ({
            params: { id }
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string }

    const pokemon = await getPokemonInfo( id )

    if  ( !pokemon ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon
        },
        revalidate: 86400
    }
}

export default Pokemon