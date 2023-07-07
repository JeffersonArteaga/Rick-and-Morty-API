
let array = ["morty", "rick", "beth", "summer", "jerry", "squanchy", "revolio", "President Curtis", "Tammy", "Evil Morty", "alien"];

// Función para mezclar el orden de los elementos en un array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Mezclar el orden de los elementos en el array
array = shuffle(array);

// Función para obtener un número aleatorio dentro de un rango
function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < array.length; i++) {
  function obtienePersonajes(done) {
    let results = fetch(`https://rickandmortyapi.com/api/character/?name=${array[i]}`)

    results
      .then(response => response.json())
      .then(data => {
        done(data);
      });
  }

  obtienePersonajes(data => {
    const personajesAleatorios = [];
    const totalPersonajes = data.results.length;

    // Obtener dos índices aleatorios sin repetición
    while (personajesAleatorios.length < 2) {
      const randomIndex = getRandomIndex(0, totalPersonajes - 1);
      if (!personajesAleatorios.includes(randomIndex)) {
        personajesAleatorios.push(randomIndex);
      }
    }

    const primerosPersonajes = personajesAleatorios.map(index => data.results[index]);
    var changer = 0;
    primerosPersonajes.forEach((pj, index) => {
      const tableRow = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = pj.name;

      const statusCell = document.createElement("td");
      statusCell.textContent = pj.status;

      const imageCell = document.createElement("td");
      const image = document.createElement("img");
      image.src = pj.image;
      imageCell.appendChild(image);

      const image2Cell = document.createElement("td");  // Nueva celda para "Image 2"
      const image2 = document.createElement("img");
      if (index + 1 < primerosPersonajes.length) {
        image2.src = primerosPersonajes[index + 1].image;
      }
      image2Cell.appendChild(image2);

      if (changer == 0) {
        tableRow.appendChild(nameCell);
        tableRow.appendChild(statusCell);
        tableRow.appendChild(imageCell);
        tableRow.appendChild(image2Cell);  // Agrega la celda de "Image 2"
        tableRow.classList.add("personaje");
        changer = 1;
      }
      const tbody = document.getElementById("tableElements");
      tbody.appendChild(tableRow);
    });
  });
}




  
  
  
  
  
  
  
  
  