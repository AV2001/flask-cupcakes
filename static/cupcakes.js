async function getAllCupcakes() {
    const response = await axios.get('/api/cupcakes');
    const data = response.data;
    for (const cupcake of data['cupcakes']) {
        $('.cupcakes-list').append(
            `<li>${cupcake.flavor} <button class="remove-cupcake">X</button></li>`
        );
    }
}

$('form').submit(async (e) => {
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
