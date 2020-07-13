class PokemonList extends React.Component {
    constructor(props) {
        super(props);
        // Good practice to initialize components with "empty states"
        this.state = {
            pokemons: []
        }
    }

    componentDidMount() {
        this.setState({pokemons: Seed.pokemons})
    }
    // passing the function down to the child component 
    handlePokemonUpVote(pokemonId) {
        console.log(pokemonId + ' was upvoted');
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