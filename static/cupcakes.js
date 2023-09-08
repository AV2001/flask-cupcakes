async function getAllCupcakes() {
    const response = await axios.get('/api/cupcakes');
    const data = response.data;
    for (const cupcake of data['cupcakes']) {
        $('.cupcakes-list').append(
            `<li>${cupcake.flavor} <button class="remove-cupcake">X</button></li>`
        );
    }
}

window.onload = getAllCupcakes;
