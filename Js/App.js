const onload = document.getElementById("onload");
const NameCity = document.getElementById("city");
const search = document.getElementById("search");
const weather = document.querySelector(".weather");
const d = new Date();

window.addEventListener("load", function () {
  onload.style.transform = "translatex(100%)";
});

weather.classList.add("weather--standar");

let Weather = {
  ApiKey: "83434e913334914d267c87262bb93965",
  FecthWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.ApiKey
    )
      .then((response) => response.json())
      .then((data) => this.DisplayWeather(data));
  },
  DisplayWeather: function (data) {
    const container = document.querySelector(".weather__message");
    const card = document.querySelector(".weather__message--response");
    const ico = document.querySelector("#ico_message");
    const message = document.querySelector("#message");

    if (data.cod == 200) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, pressure } = data.main;
      const { speed } = data.wind;
      document.querySelector(".weather__content--results").style =
        "display: block";
      document.querySelector(".weather__content--logo").style = "display: none";
      document.querySelector("#name").innerText = name;
      document.querySelector("#fecha").innerText = this.dateString(d);
      document.querySelector("#temp").innerText = temp + "°c";
      document.querySelector("#icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector("#descripcion").innerText = description;
      document.querySelector("#humidity").innerText = humidity + "%";
      document.querySelector("#pressure").innerText = pressure;
      (document.querySelector("#speed").innerText = speed),
        (document.querySelector("#icon").style = "display: block");
      document.querySelector("#temp_box").style =
        "border-bottom: 5px dashed var(--text-color)";
      document.querySelector(".weather__contet--opcion").style =
        "display: flex";
      container.style = "display: flex";
      card.style =
        "background-color:rgba(47, 198, 53); animation: fadeInRight; animation-duration: 1s;";
      ico.className = "fa fa-check";
      message.innerHTML =
        "Datos encontrados, la consulta se realizo correctamente.";
      setTimeout(() => {
        container.style = "display: none";
      }, 3000);
    } else {
      document.querySelector(".weather__content--results").style =
        "display: none";
      document.querySelector(".weather__content--logo").style =
        "display: block";
      container.style = "display: flex";
      card.style =
        "background-color: crimson; animation: fadeInRight; animation-duration: 1s;";
      ico.className = "fa fa-circle-exclamation";
      message.innerHTML =
        "No se encontraron datos, por favor vuelva a buscar la ciudad.";
      setTimeout(() => {
        container.style = "display: none";
      }, 3000);
    }
  },
  Search: function () {
    this.FecthWeather(NameCity.value);
  },
  dateString: function (date) {
    const day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "saturday",
    ];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      day[date.getDay()] +
      ", " +
      month[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear()
    );
  },
};

let shedule = {
  ApiKey: "44d69c2a305e4d7e903c23211333fb7d",
  fecthschedule: function (city) {
    fetch(
      "https://timezone.abstractapi.com/v1/current_time/?api_key=" +
        this.ApiKey +
        "&location=" +
        city
    )
      .then((response) => response.json())
      .then((data) => this.DisplayShedule(data));
  },
  DisplayShedule: function (data) {
    const { datetime } = data;
    const time = new Date(datetime);
    weather.classList.remove(
      "weather--sunset",
      "weather--sunrise",
      "weather--night"
    );
    if (time.getHours() <= 12) {
      weather.classList.add("weather--sunrise");
    }
    if (time.getHours() >= 13 && time.getHours() <= 17) {
      weather.classList.add("weather--sunset");
    }
    if (time.getHours() >= 18) {
      weather.classList.add("weather--night");
    }
  },
  SearchSchedule: function () {
    this.fecthschedule(NameCity.value);
  },
};

search.addEventListener("click", function () {
  Weather.Search();
  shedule.SearchSchedule();
  NameCity.value = "";
});

NameCity.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    Weather.Search();
    shedule.SearchSchedule();
    NameCity.value = "";
  }
});
