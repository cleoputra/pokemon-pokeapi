import React, { useState, useEffect } from 'react';
import { Typography, Link, CircularProgress, Button, Grid, Toolbar, AppBar } from "@material-ui/core";
import axios from 'axios';
import MyPokemon from "./myPokemon";
import pokeball from "./pokeball.png";
import mypoke from "./fight.png";

const catchPokemon = (payload) => {
    const prevPokemon = JSON.parse(localStorage.getItem('myData')) || [];
    const newPokemon = [payload, ...prevPokemon]
    localStorage.setItem('myData', JSON.stringify(newPokemon));
    console.log(newPokemon);
    <MyPokemon key={localStorage} />

}
const Pokemon = (props) => {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(function (response) {
                const { data } = response;
                setPokemon(data);
            })
            .catch(function (error) {
                setPokemon(false);
            });
    }, [pokemonId]);

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

        return (
            <>
                <React.Fragment>

                    <AppBar position="fixed" color="primary" className="appBar">
                        <Toolbar>
                            <a href="/"><img src={pokeball} alt="hompage" /></a>
                            <a href="/myPokemon"><img className="tab-icon mg-left" alt="mypokemon" src={mypoke} /></a>
                            <Typography className="txt_desc-2">{name}</Typography>

                        </Toolbar>
                    </AppBar>

                    <br /><br /><br /><br />

                    <Grid container spacing={3} className="center" justify="center"
                        alignItems="center">
                        <Grid item xs={6} fluid>
                            <Typography className="name-pokemon">
                                {name}
                            </Typography>
                            <img src={fullImageUrl} className="image_poke" alt="Pokemon" />
                            <Typography className="text_desc">Pokemon Info</Typography>
                            <Typography>
                                {"Species: "}
                                <Link href={species.url}>{species.name} </Link>
                            </Typography>
                            <Typography>Height: {height} </Typography>
                            <Typography>Weight: {weight} </Typography>
                            <Typography variant="h6"> Types:</Typography>
                            {types.map((typeInfo) => {
                                const { type } = typeInfo;
                                const { name } = type;
                                return <Typography key={name}> {`${name}`}</Typography>;
                            })}
                            <br />
                            <Button variant="contained" color="primary" onClick={() => { catchPokemon({ name, id, species, height, weight, types }) }}>CATCH Pokemon</Button>
                        </Grid>
                    </Grid>

                </React.Fragment>
            </>
        );
    };
    return (
        <>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
            {pokemon === false && <Typography>Pokemons not found!</Typography>}

            {pokemon !== undefined && (

                <Grid container spacing={3} className="center">
                    <Grid item xs={12}>

                        <Button color="secondary" className="center" variant="contained" onClick={() => history.push("/")}>
                            Back to pokedex
                </Button>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default Pokemon;