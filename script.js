const API_KEY = 'your_tmdb_api_key'; // Get this from TMDB website
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function searchMovies() {
    const searchInput = document.getElementById('movieSearch').value;
    if (!searchInput) return;

    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchInput)}`
        );
        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayResults(movies) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = `
            <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'images/no-poster.jpg'}" 
                     alt="${movie.title}" 
                     class="w-full h-96 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-bold mb-2">${movie.title}</h3>
                    <p class="text-gray-300 text-sm">${movie.release_date?.split('-')[0] || 'N/A'}</p>
                    <p class="text-gray-400 mt-2 text-sm line-clamp-3">${movie.overview || 'No description available'}</p>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += movieCard;
    });
}