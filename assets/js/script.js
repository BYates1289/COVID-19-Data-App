$(function() {
	var countries, selectedCountry, countryTotalConfirmed, countryTotalDeaths, countryTotalRecovered, contryNewConfirmed, countryNewDeaths, countryNewRecovered;

	document.querySelector(".date").innerHTML = new Date(Date.now()).toLocaleString().split(',')[0];

	fetchFunc = () => fetch("https://api.covid19api.com/summary")
		.then((apiData) => {
			return apiData.json();
		})
		.then((actualData) => {
			var actualData = actualData;
		});
	fetch("https://api.covid19api.com/summary")
		.then((apiData) => {
			return apiData.json();
		})
		.then((actualData) => {
			console.log(actualData);
			var Global = actualData.Global;
			document.getElementById("Global").addEventListener("click", function() {
				document.getElementById("covidData").style.display = "block";
				document.getElementById("covidData").innerHTML =
					`<div class="data"><div class="text-country"><strong>World Wide Cases</strong></div>
		            <div class="text-conf">Total Confirmed: <span>${Global.TotalConfirmed}</span></div>
		            <div class="text-death">Total Deaths: <span>${Global.TotalDeaths}</span></div>
					<div class="text-conf">New Confirmed: <span>${Global.NewConfirmed}</span></div>
					<div class="text-death">New Deaths: <span>${Global.NewDeaths}</span></div>`;
			});

			var fullData = actualData,
				countries = actualData.Countries;
			countries.forEach(myFunc);

			function myFunc(index, item) {
				var countryName = countries[item].Country;
				document.getElementById("selectCountry").innerHTML +=
					`<option value="${countryName}"> ${countryName}</option> `;
			}
		}).catch((error) => {
			document.querySelector("#covidData").style.display = "block";
			document.querySelector("#covidData").innerHTML =
				`<h2>Error occured. Please refresh page and try again.</h2>`;
		});

	fetchFunc();
	document.getElementById("selectCountry").addEventListener("change", function() {
		var selectedCountry = this.value,
			countryTotalConfirmed,
			countryTotalDeaths,
			countryTotalRecovered,
			contryNewConfirmed,
			countryNewDeaths,
			countryNewRecovered;

		fetch("https://api.covid19api.com/summary")
			.then((apiData) => {
				return apiData.json();
			})
			.then((actualData) => {
				var fullData = actualData,
					countries = actualData.Countries;
				countries.forEach(myFunction);

				function myFunction(index, item) {
					if (fullData.Countries[item].Country == selectedCountry) {
						var countryTotalConfirmed = countries[item].TotalConfirmed,
							countryTotalDeaths = countries[item].TotalDeaths,
							countryTotalRecovered = countries[item].TotalRecovered,
							contryNewConfirmed = countries[item].NewConfirmed,
							countryNewDeaths = countries[item].NewDeaths,
							countryNewRecovered = countries[item].NewRecovered;
						document.getElementById("covidData").innerHTML = `
                        <div class="data"><div class="text-country">Selected country is: <span>${selectedCountry}</span></div>
						<div class="text-conf">Total Confirmed: <span>${countryTotalConfirmed}</span> </div>
						<div class="text-death">Total Deaths: <span>${countryTotalDeaths}</span></div> 
                        <div class="latest-update mt-5">Latest 24 Hours</div>
						<div class="text-conf">New Confirmed: <span>${contryNewConfirmed}</span></div>
						<div class="text-death">New Deaths: <span>${countryNewDeaths}</span></div>`;

						function bgClr() {
							var x = Math.floor(Math.random() * 256),
								y = Math.floor(Math.random() * 256),
								z = Math.floor(Math.random() * 256),
								bgColor = `rgb(${x}, ${y}, ${z})`,
								bgColorspan = `rgb(${x - 30}, ${y - 30}, ${z - 30})`,
								bgWWColor = `rgb(${y}, ${x}, ${z})`,
								bgColorWWspan = `rgb(${y - 30}, ${x - 30}, ${z - 30})`;
							document.getElementById("covidData").style.display = "block";
							document.getElementById("Global").addEventListener("click", function() {
								spanElement.forEach((i) => {
									i.style.backgroundColor = bgColorWWspan;
								});
							});
							document.getElementById("covidData").style.backgroundColor = bgColor;
						}
						bgClr();
					}
				}
			});
	});
});
