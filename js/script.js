 let gifs;
 let button = document.querySelector('button');
 let input = document.querySelector('input');
 let result = document.querySelector('.result');
 let images;

 button.addEventListener('click', function (e) {
     images = document.querySelectorAll('.bg-img');
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
                 let date = e.import_datetime;
                 date = date.substring(0, date.indexOf(' '));
                 name = name.substring(0, name.indexOf('GIF'));
                 result.innerHTML += `<div style="background-image: url(${e.images.downsized.url})" class="bg-img">
                                            <div class="img-row">
                                                <div class="img-col">
                                                    <h2>${name}</h2>
                                                    <h4>${e.username}</h4>
                                                    <h5>${date}</h5>
                                                </div>
                                                <div class="link-copy">
                                                    <img class="image-link" src="./assets/url.svg" alt="${e.images.downsized.url}">
                                                    <img class="code-link" src="./assets/code.svg">
                                                </div>
                                            </div>
                                        </div>`;
                
             });
         }).catch(function (err) {
 	        console.warn('Something went wrong.', err);
         });
     } else {
        alert('Please enter a search term.');
     }
});

//addevent listener for copy the link by the image-link class

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('image-link')) {
        let link = e.target.alt;
        console.log(link);
        navigator.clipboard.writeText(link).then(() => {
            // Alert the user that the action took place.
            // Nobody likes hidden stuff being done under the hood!
            alert("Copied to clipboard");
        });
    }
}
);
