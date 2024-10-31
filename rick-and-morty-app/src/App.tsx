import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import CharacterGrid from "./components/CharacterGrid";

const App: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/episode");
      const data = await response.json();
      setEpisodes(data.results);
    };

    fetchEpisodes();
  }, []);

  return (
    <div className="flex h-screen w-full">
      <Sidebar
        episodes={episodes}
        onSelectEpisode={setSelectedEpisode}
        selectedEpisode={selectedEpisode}
      />
      <CharacterGrid selectedEpisode={selectedEpisode} />
    </div>
  );
};

export default App;
