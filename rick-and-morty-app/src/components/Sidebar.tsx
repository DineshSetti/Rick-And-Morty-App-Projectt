import React from "react";

interface Episode {
  id: number;
  name: string;
}

interface SidebarProps {
  episodes: Episode[];
  onSelectEpisode: (episode: number | null) => void;
  selectedEpisode: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  episodes,
  onSelectEpisode,
  selectedEpisode,
}) => {
  const handleEpisodeClick = (episodeId: number) => {
    onSelectEpisode(selectedEpisode === episodeId ? null : episodeId);
  };

  return (
    <aside className="w-64 h-full bg-gray-900 text-white p-4 overflow-y-auto shadow-lg border-r-2 border-teal-500">
      <h2 className="text-lg font-bold mb-4 text-teal-300">Episodes</h2>
      <ul className="space-y-2">
        {episodes.map((episode) => (
          <li key={episode.id}>
            <button
              onClick={() => handleEpisodeClick(episode.id)}
              className={`block w-full text-left p-2 rounded-lg transition duration-200 ${
                selectedEpisode === episode.id
                  ? "bg-teal-600 border-l-4 border-teal-800 text-white"
                  : "hover:bg-teal-700 text-gray-300"
              }`}
            >
              {episode.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
