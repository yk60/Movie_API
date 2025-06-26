export function buildMoviesUrl({ query, genres, page, limit }) {
  const params = [];
  if (query && query.trim()) params.push(`query=${encodeURIComponent(query)}`);
  if (genres && genres.length > 0) {
    genres.forEach((genre) =>
      params.push(`genre=${encodeURIComponent(genre)}`)
    );
  }
  if (page) params.push(`page=${page}`);
  if (limit) params.push(`limit=${limit}`);
  console.log(`builtUrl: /movies?${params.join("&")}`);
  return `/movies?${params.join("&")}`;
}
