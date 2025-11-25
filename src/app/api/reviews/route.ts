import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// FIX NEXT 15: runtime explicite Node.js
export const runtime = "nodejs";

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
};

type GooglePlaceDetailsResponse = {
  result?: {
    reviews?: GoogleReview[];
  };
  status?: string;
  error_message?: string;
};

type Review = {
  author: string;
  rating: number;
  text: string;
  date: string;
  photo: string | null;
  source: string;
};

// --- CACHE 24H ---
let cachedReviews: Review[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

export async function GET(_request: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: 'Google Places API key or Place ID is missing.' },
      { status: 500 }
    );
  }

  // Vérifie si le cache est encore valide
  const now = Date.now();
  if (cachedReviews && now - cacheTimestamp < CACHE_DURATION) {
    console.log('✅ Reviews served from cache');
    return NextResponse.json(cachedReviews);
  }

  // Appel API Google
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'reviews',
    language: 'fr',
    key: apiKey,
  });

  const url = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`;

  try {
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Google Places API request failed with ${response.status}`);
    }

    const data = (await response.json()) as GooglePlaceDetailsResponse;

    if (data.status !== 'OK') {
      const message = data.error_message || 'Google Places API returned an error.';
      return NextResponse.json({ error: message }, { status: 502 });
    }

    // Transformation des données
    const reviews: Review[] =
      data.result?.reviews?.map((review) => ({
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        date: review.relative_time_description,
        photo: review.profile_photo_url ?? null,
        source: 'Google',
      })) ?? [];

    // Enregistre dans le cache
    cachedReviews = reviews;
    cacheTimestamp = Date.now();
    console.log('♻️ Reviews fetched from Google API and cached.');

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('[reviews API] Failed to fetch Google reviews:', error);
    return NextResponse.json(
      { error: 'Unable to fetch Google reviews at the moment.' },
      { status: 500 }
    );
  }
}
