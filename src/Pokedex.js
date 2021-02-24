import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardMedia,
    Toolbar,
    Typography,
    CircularProgress,
    AppBar,
} from "@material-ui/core";
import axios from 'axios';
import pokeball from "./pokeball.png";
import mypoke from "./fight.png";


const Pokedex = props => {
    const { history } = props;
    const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=10`)
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1
                            }.png`,
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, []);


    const getPokemonCard = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];

        return (
            <React.Fragment>

                <AppBar position="fixed" color="primary" className="appBar ">
                    <Toolbar>
                        <a href="/pokemon-pokeapi"><img src={pokeball} alt="hompage" /></a>
                        <a href="/myPokemon"><img className="tab-icon mg-left" alt="mypokemon" src={mypoke} /></a>
                        <Typography className="txt_desc-2">POKEDEX</Typography>

                    </Toolbar>
                </AppBar>

                <Grid item xs={12} sm={4} key={pokemonId} >
                    <Card className="center space-top" onClick={() => history.push(`/${id}`)}>
                        <CardMedia className="cardMedia image_poke" image={sprite} style={{ width: "130px", height: "130px" }} />
                        <Typography className="name-pokemon">{name}</Typography>
                    </Card>
                </Grid>
            </React.Fragment>

        );
    };

    return (
        <>
            <AppBar position="static">

            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className="pokedexContainer">
                    {Object.keys(pokemonData).map((pokemonId) =>
                        getPokemonCard(pokemonId))}
                </Grid>
            ) : (
                    <CircularProgress />
                )}
        </>
    );
};

export default Pokedex;