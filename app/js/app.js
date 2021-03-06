const images = ['./images/luke_skywalker.jpg','./images/c-3po.jpg','./images/r2d2.jpg','./images/darth_vader.jpeg','./images/princess_leia.jpg','./images/owen_lars.jpg','./images/beru_lars.jpg','./images/R5d4.jpg','./images/Biggs_darklighter.png','./images/obi-wan.jpg'];


function getPeople() {
   const endpoint = "https://swapi.co/api/people/";
   return fetch(endpoint)
      .then(function(blob) {
         return blob.json();
      })
      .then(function(data) {
         return data.results;
      });
}

getPeople().then(peopleObject => { 
    displayPerson(peopleObject)
});

function displayPerson(peopleObject) {
  
      const people = peopleObject.map((person, idx) => {
        return `
          <div class="card">
            <p class="card__name"> ${person.name} </p>
            <img class="card__image"src="${images[idx % images.length]}"/>
            <div class="desc-contain">
              <p class="card__gender desc"> Gender: ${person.gender}</p>
              <p class="card__height desc"> Height: ${person.height}cm </p>
              <p class="card__weight desc"> Mass: ${person.mass}kg</p>
              <p class="card__eyes desc"> Eye Colour: ${person.eye_color}</p>
              <p class="card__birth desc"> Birth Year: ${person.birth_year}</p>
            </div>
            </div>
          </div>
        `
   }).join('');
  const cardContainer = document.createElement('div');
  cardContainer.className += "card-container";
  cardContainer.innerHTML = people;
  document.body.appendChild(cardContainer);
}
