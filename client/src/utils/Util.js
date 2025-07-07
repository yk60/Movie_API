export function buildMoviesUrl({ query, genre = [], page, limit, sort }) {
  const params = [];
  if (query && query.trim()) params.push(`query=${encodeURIComponent(query)}`);
  if (genre && genre.length > 0) {
    genre.forEach((g) => params.push(`genre=${encodeURIComponent(g)}`));
  }
  if (page) params.push(`page=${page}`);
  if (limit) params.push(`limit=${limit}`);
  if (sort) params.push(`sort=${sort}`);
  console.log(`builtUrl: /movies?${params.join("&")}`);
  return `/movies?${params.join("&")}`;
}
