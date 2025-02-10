"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const artistName = searchParams.get("artist");
  const tagName = searchParams.get("tag");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (artistName) {
      filtered = filtered.filter(
        (event) => event.artist.toLowerCase() === artistName.toLowerCase()
      );
    }

    if (tagName) {
      filtered = filtered.filter((event) =>
        event.tags.some((tag) => tag.toLowerCase() === tagName.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [artistName, tagName, events]);

  if (loading) return <p className="text-center text-xl">Loading events...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} eventData={event} />
          ))
        ) : (
          <p className="text-center text-xl">
            No events available {artistName ? `for ${artistName}` : ""}{" "}
            {tagName ? `with tag "${tagName}"` : ""}.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
