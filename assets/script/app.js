function getPrayerTimes(latitude, longitude) {
  fetch(
    "https://api.aladhan.com/v1/calendar?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&method=4"
  )
    .then((response) => response.json())
    .then((response) => {
      let date = new Date();
      let today = date.getDate() - 1;
      let data = response.data[today].timings;

      const tableList = document.querySelector(".table");
      let tableBody = document.createElement("tbody");

      for (i in data) {
        let row = tableBody.insertRow();
        let name = row.insertCell(0);
        let time = row.insertCell(1);
        name.innerHTML = i;
        time.innerHTML = data[i];
        tableBody.appendChild(row);
      }

      tableList.appendChild(tableBody);

      console.log(data);
    });
}

function success(location) {
  getPrayerTimes(location.coords.latitude, location.coords.longitude);
}

function error() {
  getPrayerTimes("-6.200000", "106.816666");
}

function getLocation() {
  if (!navigator.geolocation) {
    Swal.fire({
      title: "Not Found",
      text: "Geolocation tidak didukung pada browser ini, silahkan gunakan browser yang lain!",
      icon: "error",
    });
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

getLocation();
