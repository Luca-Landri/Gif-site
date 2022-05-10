let gifs;
let button = document.querySelector('button');
let input = document.querySelector('input');
let result = document.querySelector('.result');

button.addEventListener('click', function (e) {
    let images = document.querySelectorAll('.bg-img');
    console.log(images + "Porco dio")
    e.preventDefault();
    images.forEach(function (image) {
        image.remove();
        console.log("Levo le foto");    
    });
    if (input.value !== '') {
            fetch(`https://api.giphy.com/v1/gifs/search?q=${input.value}&api_key=AtYhATsNhnrzi1saCTR7O53P9jWwdFao`).then(function (response) {
	        return response.json();
        }).then(function (data) {
	        console.log(data);
            gifs = data.data;
            console.log(gifs);
            

            gifs.forEach(e => {
                let name = e.title;
                name = name.substring(0, name.indexOf('by'));
                result.innerHTML += `<div style="background-image: url(${e.images.downsized.url})" class="bg-img">
                                        <h2>${name}</h2>
                                        <h4>${e.username}</h4>
                                        <h5>${e.import_datetime}</h5>
                                    </div>`;
                
            });
        }).catch(function (err) {
	        console.warn('Something went wrong.', err);
        });
    } else {
        alert('Please enter a search term.');
    }



});