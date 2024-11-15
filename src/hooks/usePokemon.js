import { useCallback, useState } from "react";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUsedId, setLastUsedId] = useState(null);

  const fetchPokemonById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon with ID: ${id}`);
    }
    return await response.json();
  };

  const getRandomPokemonId = () => Math.floor(Math.random() * 151) + 1;

  const fetchRandomPokemon = useCallback(async () => {
    setLoading(true);
    try {
      let currentId;
      do {
        currentId = getRandomPokemonId();
      } while (currentId === lastUsedId);
      const fetchedPokemon = await fetchPokemonById(currentId);
      setPokemon(fetchedPokemon);
      setLastUsedId(currentId);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  }, [lastUsedId]);

  return { pokemon, loading, fetchRandomPokemon };
};
