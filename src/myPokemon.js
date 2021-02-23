import React from 'react';
import {
    Grid, Button,
    Typography, Toolbar, AppBar
} from "@material-ui/core";

import pokeball from "./pokeball.png";
import mypoke from "./fight.png";

const catchList = JSON.parse(localStorage.getItem('myData')) || [];
const MyPokemon = () => {

    console.log(catchList);
    const remove = () => {
        localStorage.removeItem('myData');
        window.location.reload();
    }

    return (
        <React.Fragment>

            <AppBar position="fixed" color="primary" className="appBar ">
                <Toolbar>
                    <a href="/"><img src={pokeball} alt="hompage" /></a>
                    <a href="/myPokemon"><img className="tab-icon mg-left" alt="my-pokemon" src={mypoke} /></a>
                    <Typography className="txt_desc-2">My Pokemon</Typography>

                </Toolbar>
            </AppBar>

            <br /><br /><br /><br />
            <Grid container spacing={3} className="center" justify="center" alignItems="center">
                {catchList.map(i => (

                    <Grid item xs={12} fluid>
                        <img src={`https://pokeres.bastionbot.org/images/pokemon/${i.id}.png`} className="image_poke_2" alt="Pokemon" />
                        <Typography className="name-pokemon">{i.name}</Typography>
                    </Grid>

                ))
                }
                <Button color="secondary" className="center" variant="contained" onClick={remove}>Release All Pokemon</Button>
            </Grid>
        </React.Fragment>

    )

};
export default MyPokemon;