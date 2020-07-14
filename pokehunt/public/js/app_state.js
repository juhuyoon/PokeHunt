class PokemonList extends React.Component {
    state = {
        pokemons: [],
    }
    // constructor(props) {
    //     super(props);
    //     // Good practice to initialize components with "empty states"
    //     // Should consider this.state object as immutable
    //     // Only modifies through using this.setState()
    //     this.state = {
    //         pokemons: [],
    //     }

    //     this.handlePokemonUpVote = this.handlePokemonUpVote.bind(this);
    // }

    componentDidMount() {
        // setState() is asynchronous
        // Thus no guarantee when React will update the state & re-render component.
        this.setState({pokemons: Seed.pokemons})
    }
    // passing the function down to the child component 
    handlePokemonUpVote = (pokemonId) => {
        // Traverses the array AND returns a NEW array as opposed to 
        // changing directly the array in state. 
        const pokemonObjects  = this.state.pokemons.map((pokemon) => {
            if(pokemon.id === pokemonId) {
                return Object.assign({}, pokemon, {
                    votes: pokemon.votes +1
                });
            } else {
                return pokemon;
            }
        })
        this.setState({
            pokemons: pokemonObjects
        })
        console.log(pokemonObjects);
    }
    render() {
        const pokemons = this.state.pokemons.sort((a, b) => {
            return (b.votes - a.votes)
            // Compare function of Array.prototype.sort()
        })
        // productComponents Array
        const pokemonComponents = pokemons.map((pokemon) => {
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
    // constructor(props) {
    //     super(props);
    //     // When defining custom methods, must perform binding pattern 
    //     // inside constructor() so that this references component
    //     this.handleUpVote = this.handleUpVote.bind(this);
    // }

    // By using arrow function, bind this to the component
    handleUpVote = () => {
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