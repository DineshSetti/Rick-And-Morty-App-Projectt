import React, { useEffect, useState } from "react";

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterGridProps {
  selectedEpisode: number | null;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ selectedEpisode }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (selectedEpisode) {
        const episodeResponse = await fetch(
          `https://rickandmortyapi.com/api/episode/${selectedEpisode}`
        );
        const episodeData = await episodeResponse.json();

        const characterIds = episodeData.characters.map((url: string) =>
          url.split("/").pop()
        );
        const charactersResponse = await fetch(
          `https://rickandmortyapi.com/api/character/${characterIds.join(",")}`
        );
        const characterData = await charactersResponse.json();

        setCharacters(
          Array.isArray(characterData) ? characterData : [characterData]
        );
      } else {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );
        const data = await response.json();
        setCharacters(data.results);
      }
    };

    fetchCharacters();
  }, [selectedEpisode]);

  return (
    <main className="flex-grow h-full bg-gray-800 p-6 overflow-auto">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div
              key={character.id}
              className="card p-4 rounded-lg shadow-lg transition duration-200"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-200 text-center">
                {character.name}
              </h2>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">
            Select an episode to see characters.
          </p>
        )}
      </div>
    </main>
  );
};

export default CharacterGrid;
