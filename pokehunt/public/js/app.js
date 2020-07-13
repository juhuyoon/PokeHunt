class PokemonList extends React.Component {
    // passing the function down to the child component 
    handlePokemonUpVote(pokemonId) {
        console.log(pokemonId + ' was upvoted');
    }
    render() {
        // implicit return
        /*
        const pokemon = Seed.products.sort((a,b) => (
            b.votes - a.votes
        )) 
        */
    //    Create a copy of the array to not mutate main array
    //    Note: this is a shallow copy, there is also a deep copy. 
       let copyOfPokemon = Array.prototype.slice.call(Seed.pokemon);
       console.log("Copy of Array", copyOfPokemon)
       console.log("Main Array ", Seed.pokemon);
        const pokemons = copyOfPokemon.sort((a, b) => {
            return (b.votes - a.votes)
            // Compare function of Array.prototype.sort()
        })
        // productComponents Array
        const pokemonComponents = copyOfPokemon.map((pokemon) => {
            return <Pokemon 
            // Key is used as a unique binding for each component
            key= {'pokemon- ' + pokemon.id}
            id={pokemon.id}
            title={pokemon.title}
            description={pokemon.description}
            url={pokemon.url}
            votes={pokemon.votes}
            submitterAvatarUrl={pokemon.submitterAvatarUrl}
            pokemonImageUrl={pokemon.pokemonImageUrl}
            // passing function down as a prop
            onVote={this.handlePokemonUpVote}
        />
        });
        return (
            <div className='ui unstackable items'>
                {pokemonComponents}
            </div>
        )
    }
}

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        // When defining custom methods, must perform binding pattern 
        // inside constructor() so that this references component
        this.handleUpVote = this.handleUpVote.bind(this);
    }

    handleUpVote() {
        this.props.onVote(this.props.id);
    }
    render() {
        // When working inside render, this is always bound to component. handleUpVote() => returns null. 
        return(
            <div className='item'>
                <div className='image'> 
                    <img src={this.props.pokemonImageUrl} />
                </div>
                <div className='middle aligned content'>
                    <div className='header'>
                        <a onClick={this.handleUpVote}>
                            <i className='larget caret up icon' />
                        </a>
                        {this.props.votes}
                    </div>
                    <div className='description'>
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                        <p>
                            {this.props.description}
                        </p>
                    </div>
                    <div className='extra'>
                        <span> Submitted by: </span>
                        <img className='ui avatar image' src={this.props.submitterAvatarUrl} />
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <PokemonList />,
    document.getElementById('content')
)