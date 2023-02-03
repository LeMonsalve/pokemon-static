function toggleFavorite( id: number ) {
    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' )

    if ( favorites.includes( id ) ) {
        favorites = favorites.filter(pokemonId => pokemonId !== id)
    } else {
        favorites.push( id )
    }

    localStorage.setItem('favorites', JSON.stringify( favorites ))
}

function existsInFavorites( id: number ) {

    if ( typeof window === 'undefined' ) return false

    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' )

    return favorites.includes( id )

}

function pokemons(): number[] {

    return JSON.parse( localStorage.getItem('favorites') || '[]' )

}

export default {
    toggleFavorite,
    existsInFavorites,
    pokemons
}