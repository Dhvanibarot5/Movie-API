const API_KEY = "c6e6c30e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function searchMovies() {
  const searchInput = document.getElementById("movieSearch").value;
  if (!searchInput) return;

  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=${API_KEY}`);
    const data = await response.json();
    console.log(data);

    displayResults(data.Search);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function displayResults(movies) {
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = `
            <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img src="${movie.Poster}" 
                     alt="${movie.Title}" 
                     class="w-full h-96 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-bold mb-2">${movie.Title}</h3>
                    <p class="text-gray-300 text-sm">${movie.Year?.split("-")[0] || "N/A"}</p>
                    <p class="text-gray-400 mt-2 text-sm line-clamp-3">${movie.Type || "No description available"}</p>
                </div>
            </div>
        `;
    resultsContainer.innerHTML += movieCard;
  });
}
