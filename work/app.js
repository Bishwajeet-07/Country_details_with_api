const card_space = document.querySelector(".head")
const body = document.body;
const option_block = document.querySelector(".option_block")
const region_color = document.querySelector(".region_color")
const input_search =  document.querySelector(".input_icon input")
let flag;
let country_data;

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data)=>{
        country_card(data)
        country_data = data;
    })

// region select
let valueofregion
option_block.addEventListener("change", (e) => {
    valueofregion = e.target.value
    console.log(valueofregion)
    if (valueofregion === 'Default') {
        location.reload(true)
    }
    else {
        fetch(`https://restcountries.com/v3.1/region/${valueofregion}`)
            .then((res) => res.json())
            .then(country_card)
            flag = "region_text_color";

    }
})

// function for all country card
function country_card(data) {
    card_space.innerHTML = "";
    data.forEach((country) => {
        // console.log(country)
        const card_item = document.createElement("a")
        card_item.classList.add('countries')
        card_item.href = `/country.html?name=${country.name.common}`
        // card_item.href = `/work/country.html?name=${country.name.common}`

        card_item.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag">
            <div class="text_value">
            <h3 class="country_name">${country.name.common}</h3>
            <p class="card_value_name"><b>Capital: </b><span class="card_value">${country.capital || "N/A"}</span></p>
            <p class="card_value_name"><b>population: </b><span class="card_value">${country.population.toLocaleString('en-IN')}</span> </p>
            <p class="card_value_name"><b>Region: </b><span class="card_value region_color ${flag}">${country.region} </span></p>
            </div> `

        card_space.append(card_item)
    });
}

// search data 
input_search.addEventListener("input", (e)=>{
    const search_data = country_data.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    // console.log(search_data);
    country_card(search_data)
})


// toggle theme
const toDark = document.querySelector(".dark_mode")

toDark.addEventListener("click", (e) => {
    document.body.classList.toggle("dark_theme")

    if (body.classList.contains("dark_theme")) {
        // console.log(toDark.innerHTML)
        toDark.innerHTML = `<i class="fa-regular fa-moon"></i> Dark-Mode `

    }
    else {
        toDark.innerHTML = `<i class="fa-regular fa-sun"></i> Light-Mode`
    }
})

