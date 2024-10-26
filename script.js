async function fetchMovieData() {
    const response = await fetch('./info.json');
    const data = await response.json();

    document.title = `${data.title} (2024) - Official Movie Site`;
    document.getElementById('tagline').innerText = data.tagline;
    document.getElementById('plot_summary').innerText = data.plot_summary;
    document.getElementById('director').innerText = data.director;
    document.getElementById('year').innerText = data.year.toString();
    document.getElementById('runtime').innerText = data.runtime.toString();
    document.getElementById('production_company').innerText = data.production_company;
    document.getElementById('distributor').innerText = data.distributor;
    document.getElementById('genre').innerText = data.genre.join(', ');

    const castList = document.getElementById('cast-list');
    data.cast.forEach((member) => {
        const li = document.createElement('li');
        li.innerText = `${member.name} as ${member.role}`;
        castList.appendChild(li);
    });

    const imagesContainer = document.getElementById('images');
    data.images.posters.concat(data.images.scenes).forEach((url) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `${data.title} Image`;
        img.width = 200;
        imagesContainer.appendChild(img);
    });

    const triviaList = document.getElementById('trivia-list');
    data.trivia.forEach((item) => {
        const li = document.createElement('li');
        li.innerText = item;
        triviaList.appendChild(li);
    });

    document.getElementById('review_text').innerText = data.review;
}

fetchMovieData();
