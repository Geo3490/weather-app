const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    console.log(data);

    // update details template
details.innerHTML = `
<h2 class="my-3">${cityDets.EnglishName}</h2>
<h3 class="my-3">${cityDets.AdministrativeArea.LocalizedName}</h3>
<h5 class="my-3">${cityDets.PrimaryPostalCode}</h5>
<h3 class="my-3">${weather.WeatherText}</h3>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Imperial.Value}</span>
    <span>&deg;f</span>
    </div>
`;

    // update night/day icons+images
const iconSrc = `icons/${weather.WeatherIcon}.svg`
icon.setAttribute('src', iconSrc)


let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg'
    }

    // remove the d-none class if present
if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
}
    time.setAttribute('src', timeSrc)

    };

    // async function updateCity
const updateCity = async (city) =>{

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
    cityDets: cityDets,
    weather: weather
    };

};

cityForm.addEventListener('submit', e =>{
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
    });

