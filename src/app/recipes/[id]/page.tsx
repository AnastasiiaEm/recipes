import { Suspense } from 'react';
import RecipeDetailsPage from './RecipePage';

export default function RecipePageWrapper({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p className="text-center my-10">Loading recipe...</p>}>
      <RecipeDetailsPage params={params} />
    </Suspense>
  );
}
