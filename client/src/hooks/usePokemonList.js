import { useEffect, useState } from "react";

const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        const data = await response.json();

        const pokemonArray = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
        }));

        setPokemonList(pokemonArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  return { pokemonList, loading, error };
};

export default usePokemonList;
