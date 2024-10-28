async function fetchMovieData() {
    try {
        const response = await fetch('./info.json');
        const data = await response.json();

        // Populate HTML content
        document.getElementById('movie-title').innerText = `${data.title} (${data.year})`;
        document.querySelector('#director-name span').innerText = data.director;
        document.getElementById('tagline').innerText = data.tagline;
        document.getElementById('plot_summary').innerText = data.plot_summary;
        document.getElementById('director').innerText = data.director;
        document.getElementById('year').innerText = data.year;
        document.getElementById('genre').innerText = data.genre.join(', ');
        document.getElementById('runtime').innerText = data.runtime;
        document.getElementById('production_company').innerText = data.production_company;
        document.getElementById('distributor').innerText = data.distributor;
        document.getElementById('rating-count').innerText = `(${data.aggregateRating.reviewCount} ratings)`;
        document.getElementById('imdb-link').href = data.imdbUrl;

        // Populate Cast List
        const castList = document.getElementById('cast-list');
        data.cast.forEach(member => {
            const li = document.createElement('li');
            li.innerText = `${member.name} as ${member.role}`;
            castList.appendChild(li);
        });

        // Populate Gallery
        const imagesContainer = document.getElementById('images');
        data.images.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.alt = `${data.title} Image`;
            imagesContainer.appendChild(img);
        });

        // Populate Trivia
        const triviaList = document.getElementById('trivia-list');
        data.trivia.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            triviaList.appendChild(li);
        });

        // Populate Review
        document.getElementById('review_text').innerText = data.review;

        // Populate JSON-LD Schema for SEO
        const jsonLdSchema = {
            "@context": "https://schema.org",
            "@type": "Movie",
            "name": data.title,
            "genre": data.genre,
            "url": data.website,
            "image": data.images[0],
            "datePublished": data.release_date,
            "description": data.plot_summary,
            "director": {
                "@type": "Person",
                "name": data.director
            },
            "actor": data.cast.map(actor => ({
                "@type": "Person",
                "name": actor.name,
                "characterName": actor.role
            })),
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": data.aggregateRating.ratingValue,
                "reviewCount": data.aggregateRating.reviewCount
            },
            "productionCompany": {
                "@type": "Organization",
                "name": data.production_company
            },
            "duration": `PT${data.runtime}M`,
            "contentRating": data.contentRating
        };
        document.getElementById('jsonld-schema').textContent = JSON.stringify(jsonLdSchema);
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}

fetchMovieData();
