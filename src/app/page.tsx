'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState('');

  const isFormValid = query || cuisine || maxReadyTime;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-3xl w-full p-10 rounded-2xl shadow-lg space-y-6 mx-4 sm:mx-auto"
        aria-label="Recipe search form"
      >
        <h1 className="text-3xl tracking-tight">
          <span className="text-gray-500 lowercase font-medium">find a </span>
          <span className="text-gray-900 font-semibold">Recipe</span>
        </h1>

        <input
          type="text"
          placeholder="Search recipes (e.g., pasta)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none transition"
          aria-label="Search recipes"
        />

        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 h-14 shadow-sm placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
          aria-label="Select cuisine"
        >
          <option value="">Select a cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinese</option>
        </select>

        <input
          type="number"
          min={1}
          placeholder="Max preparation time (minutes)"
          value={maxReadyTime}
          onChange={(e) => setMaxReadyTime(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none transition"
          aria-label="Maximum preparation time in minutes"
        />

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 px-4 rounded text-black font-semibold transition ${
            isFormValid
              ? 'bg-[#FDEF6E] hover:bg-yellow-200 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed text-gray-700'
          }`}
        >
          Next
        </button>
      </form>
    </main>
  );
}
