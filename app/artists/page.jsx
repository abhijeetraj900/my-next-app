"use client";

import { useEffect, useState } from "react";
import ArtistCard from "@/components/ArtistCard";

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("https://qevent-backend.labs.crio.do/artists");
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Artists</h1>
      <div className="grid grid-cols-3 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artistData={artist} />
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;
