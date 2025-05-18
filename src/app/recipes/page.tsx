import Link from 'next/link';
import Image from 'next/image';
import { SPOONACULAR_BASE_URL } from './constants';

export const dynamic = 'force-dynamic';

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
  }>;
}) {
  const { query = '', cuisine = '', maxReadyTime = '' } = await searchParams;

  const apiKey = process.env.SPOONACULAR_API_KEY;
  const params = new URLSearchParams();

  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);
  params.append('apiKey', apiKey!);

  const endpoint = `${SPOONACULAR_BASE_URL}complexSearch?${params.toString()}`;

  let recipes: Recipe[] = [];
  let error = null;

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Failed to fetch recipes');
    const data: ApiResponse = await res.json();
    recipes = data.results;
  } catch (err: any) {
    error = err.message;
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-gray-900 mb-2 font-semibold text-3xl tracking-tight">
          Recipes
        </h1>

        {error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="bg-white rounded shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 transition p-6"
                aria-label={`View details for recipe ${recipe.title}`}
              >
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-900 hover:underline transition">
                  {recipe.title}
                </h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
