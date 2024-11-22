import PropTypes from "prop-types";
import { useState } from "react";
import usePokemonList from "../hooks/usePokemonList";

const Form = ({ onGuess }) => {
  const { pokemonList, loading, error } = usePokemonList();
  const [guess, setGuess] = useState("");

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundPokemon = pokemonList.find(
      (pokemon) => pokemon.name.toLowerCase() === guess.toLowerCase()
    );
    if (foundPokemon) {
      onGuess(foundPokemon.id);
    } else {
      alert("not a correct Pokémon name");
    }
    setGuess("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="guessInput"
        placeholder="Guess the Pokémon"
        value={guess}
        onChange={handleInputChange}
        required
        autoComplete="off"
      />
    </form>
  );
};

Form.propTypes = {
  onGuess: PropTypes.func.isRequired,
  pokemonList: PropTypes.array,
};

export default Form;
