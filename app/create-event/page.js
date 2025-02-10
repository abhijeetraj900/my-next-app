"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    tags: "",
    artist: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleEventCreate = async (e) => {
    e.preventDefault();

    const randomImageNumber = Math.floor(Math.random() * 99) + 1;
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      image: `/images/event-${randomImageNumber}.jpg`,
    };

    try {
      const response = await fetch(
        "https://qevent-backend.labs.crio.do/events",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        }
      );

      if (response.status === 201) {
        router.push("/events");
      } else {
        alert("Event creation failed");
      }
    } catch (error) {
      alert("Event creation failed");
    }
  };

  return (
    <form onSubmit={handleEventCreate} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={eventData.title}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="text"
        name="description"
        placeholder="Event Description"
        value={eventData.description}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="date"
        name="date"
        value={eventData.date}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={eventData.location}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={eventData.tags}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist Name"
        value={eventData.artist}
        onChange={handleChange}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Event
      </button>
    </form>
  );
};

export default CreateEvent;
