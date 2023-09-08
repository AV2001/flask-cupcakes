function displayCupcakes(container, cupcakes) {
    for (const cupcake of cupcakes) {
        $(container).append(
            `<li>${cupcake.flavor} <button class="remove-cupcake">X</button></li>`
        );
    }
}

async function getAllCupcakes() {
    const response = await axios.get('/api/cupcakes');
    const cupcakes = response.data['cupcakes'];
    displayCupcakes('.cupcakes-list', cupcakes);
}

$('.search-cupcake-form').submit(async (e) => {
    e.preventDefault();
    $('.search-cupcakes-list').empty();
    let searchTerm = $('#search');
    const response = await axios.get('/api/cupcakes/search', {
        params: { searchTerm: searchTerm.val() },
    });
    const cupcakes = response.data['cupcakes'];
    displayCupcakes('.search-cupcakes-list', cupcakes);
    searchTerm.val('');
});

$('.add-cupcake-form').submit(async (e) => {
    e.preventDefault();
    let flavor = $('#flavor');
    let size = $('#size');
    let rating = $('#rating');
    let image = $('#image');
    const response = await axios.post(
        '/api/cupcakes',
        {
            flavor: flavor.val(),
            size: size.val(),
            rating: rating.val(),
            image: image.val(),
        },
        {
            headers: {
                'content-type': 'application/json',
            },
        }
    );
    const cupcake = response.data['cupcake'];
    $('.cupcakes-list').append(
        `<li>${cupcake.flavor} <button class="remove-cupcake">X</button></li>`
    );

    flavor.val('');
    size.val('');
    rating.val('');
    image.val('');
});

window.onload = getAllCupcakes;
