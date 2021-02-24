import React from 'react';
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import MyPokemon from "./myPokemon";
import { Route, Switch } from "react-router-dom";
import "./style.css";



function App() {
  return (
    <Switch>
      <Route exact path="/pokemon-pokeapi" render={(props) => <Pokedex {...props} />} />
      <Route exact path="/myPokemon" render={(localStorage) => <MyPokemon {...localStorage} />} />
      <Route exact path="/:pokemonId" render={(props) => <Pokemon {...props} />} />
    </Switch>
  );
}

export default App;
