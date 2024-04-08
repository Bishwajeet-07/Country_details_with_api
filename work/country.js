const data_insert = document.querySelector(".country_details")
const flag_value = document.querySelector(".country_desk")
const border_country = document.querySelector(".border_country")

const url_data = new URLSearchParams(location.search).get("name");

const store = fetch(`https://restcountries.com/v3.1/name/${url_data}?fullText=true`)
.then((res) => res.json())
.then((data) => {
    // console.log(data[0])
    
    flag_value.innerHTML = `
            <img src="${data[0].flags.svg}" alt="">
            <div class="country_details">
                <h2>${data[0].name.common}</h2>
                <div class="about_details">
                    <div class="first_half">
                        <p><b>Native Name: </b>${Object.values(data[0].name.nativeName)[0].common}</p>
                        <p><b>Population: </b> ${data[0].population.toLocaleString('en-IN')}</p>
                        <p><b>Region:</b> ${data[0].region}</p>
                        <p><b>Sub Region: </b> ${data[0].subregion}</p>
                        <p><b>Capital: </b> ${data[0].capital}</p>
                    </div>
                    <div class="second_half">
                        <p><b>Top Level Domain: </b> ${data[0].tld.join(" , ")}</p>
                        <p><b>Currencies: </b> ${Object.values(data[0].currencies)[0].name}</p>
                        <p><b>Languages: </b> ${Object.values(data[0].languages)[0]}, ${Object.values(data[0].languages)[1] || ""}</p>

                    </div>
                </div>
            </div>  
`

    // console.log(data[0].borders)
    data[0].borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then(([borderName]) => {
            // console.log(borderName.borders)
            const brname = document.createElement("a")
            brname.classList.add("nameofborder")
            brname.innerText = borderName.name.common
            // brname.href = `/work/country.html?name=${borderName.name.common}`
            brname.href = `/country.html?name=${borderName.name.common}`
            border_country.append(brname)
        }) 
    });
})


