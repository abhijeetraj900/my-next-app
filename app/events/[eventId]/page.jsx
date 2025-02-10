"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Tag from "@/components/Tag";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`https://qevent-backend.labs.crio.do/events/${eventId}`);
        if (!res.ok) throw new Error("Failed to fetch event details");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) return <h2 className="text-center text-xl">Loading event details...</h2>;
  if (error) return <h2 className="text-center text-red-500">Error: {error}</h2>;
  if (!event) return <h2 className="text-center text-xl">Event not found.</h2>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <img src={event.image} alt={event.name} className="w-full rounded-lg shadow-md" />
      
      <h1 className="text-3xl font-bold mt-6">{event.name}</h1>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {event.tags.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </div>

      <div className="mt-4 text-gray-600">
        <p className="font-semibold">📅 {new Date(event.date).toDateString()} | 🕒 {event.time}</p>
        <p className="font-semibold">📍 {event.location}</p>
        <p className="font-semibold">🎤 Artist: {event.artist}</p>
        <p className="font-semibold">
          💰 {event.price > 0 ? `$${event.price.toLocaleString()}` : "FREE"}
        </p>
      </div>

      {/* Small Description */}
      <p className="mt-6 text-gray-700">
        Experience an unforgettable event filled with music, energy, and excitement. 
        Join us for an incredible time at <strong>{event.name}</strong> with <strong>{event.artist}</strong>! 
        Book your tickets now before they sell out.
      </p>

      <a
        href={event.ticketLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-6 text-center bg-gradient-to-r from-orange-400 to-teal-600 text-white px-6 py-3 rounded-md font-medium hover:opacity-80 transition"
      >
        Get Tickets 🎟️
      </a>
    </div>
  );
};

export default EventDetailsPage;
