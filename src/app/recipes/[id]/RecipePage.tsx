import { notFound } from 'next/navigation';
import Image from 'next/image';
import { SPOONACULAR_BASE_URL } from '../constants';

export default async function RecipeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const endpoint = `${SPOONACULAR_BASE_URL}${id}/information?apiKey=${apiKey}`;

  let recipe: RecipeDetails;

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Failed to fetch recipe details');

    recipe = await res.json();
  } catch (err) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-900">
          {recipe.title}
        </h1>
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={500}
          height={300}
          className="w-full rounded-xl border border-gray-100 shadow-lg object-cover mb-6"
        />
        <div className="mb-4 text-gray-700">
          <p>
            <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings}
          </p>
        </div>
        <div
          className="prose mb-4"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        />
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Ingredients
        </h2>{' '}
        <ul className="list-disc pl-6 space-y-2">
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
