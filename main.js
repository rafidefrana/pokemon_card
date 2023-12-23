const typedColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "##f0932b",
  flying: "#81ecec",
  grass:"#00b894",
  ground: "#efb549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190ff"
}
const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
    // generate angka 1 sampe 150 atau terserah 500
    let id = Math.floor(Math.random() * 500) + 1;
    // debug
    // console.log(id)
    // combine url dengan id pokeapi
    const finalUrl = url + id;
    // debug lagi
    // console.log(finalUrl)
    fetch(finalUrl).then((response) => response.json())
    .then((data) => {

        generateCard(data);
           // debug lagi
        // console.log(data)
    })
    // .catch(() => {
    //     let msg = "Pokemon Tidak Ditemukan";
    //     card.innerHTML = `${msg}`;
    // });
 
    
}

// generate card
let generateCard = (data) => {

    // debug lagi
    // console.log(data);
    const hp = data.stats[0].base_stat;
     // debug lagi hp
    // console.log(hp)
    const imgSrc = data.sprites.other.dream_world.front_default;
    // debug image
    // console.log(imgSrc);
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
//    debug name pokemon
    // console.log(pokeName)
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    // debuggg
    // console.log(statAttack, statDefense, statSpeed);

    // set the color
    const themeColor = typedColor[data.types[0].type.name]
    // debug
    // console.log(themeColor)
    card.innerHTML = `
     
        <p class="hp">
          <span>HP</span>
          ${hp}
        </p>
        <img
          src="${imgSrc}"
          width="300"
          height="300"
          alt="poke" />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
          <!-- <span>type 1</span>
          <span>type 2</span> -->
        </div>
        <div class="stats">
          <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
    `;
    appendTypes(data.types);
    styleCard(themeColor);
};

let appendTypes = (types) => {
    // debug
    console.log(types)
    // karena types bentuk array jadi memakai forEach
    types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    // debug
    // console.log(span)
    document.querySelector(".types").appendChild(span);
    });
};
let styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach(typeColor => {
    typeColor.style.backgroundColor = color
  });
};

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
