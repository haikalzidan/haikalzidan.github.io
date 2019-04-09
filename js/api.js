var base_url = "https://api.football-data.org/v2/";

const api_token = '6312683f6f68409a9dbce7766ed10eeb'

let fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
  if ("caches" in window) {
    caches.match(base_url + "teams").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var articlesHTML = "";
          console.log(data);
          data.teams.forEach(function (team) {
            articlesHTML += `
                <div class="col s12 m6 l3">
                  <div class="card">
                    <a href="./team.html?id=${team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <a href="${team.website}">
                        <p>${team.website}</p>
                      </a>
                    </div>
                  </div>
                </div>  
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetchApi(base_url + "teams")
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.teams.forEach(function (team) {
        articlesHTML += `
            <div class="col s12 m6 l3">
              <div class="card">
                <a href="./team.html?id=${team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${team.name}</span>
                  <a href="${team.website}">
                    <p>${team.website}</p>
                  </a>
                </div>
              </div>
            </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log(data);
            var articleHTML = `
            <div class = "row">
              <div class="col s12 m3">
                <div class="card">
                  <div class="card-image">
                    <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" class="responsive-img"/>
                  </div>
                </div>
              </div>
              <div class="col s12 m9">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">${data.name}</span>
                    <a href="${data.website}">
                      <p>Website: ${data.website}</p>
                    </a>
                    <p>Address: ${data.address}</p>
                    <p>Founded: ${data.founded}</p>
                    <p>Colors: ${data.clubColors}</p>
                    <p>Venue: ${data.venue}</p>
                  </div>
                </div>
              </div>
            </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchApi(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        // console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
        <div class = "row">
          <div class="col s12 m3">
            <div class="card">
              <div class="card-image">
                <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" class="responsive-img"/>
              </div>
            </div>
          </div>
          <div class="col s12 m9">
            <div class="card">
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                <a href="${data.website}">
                  <p>Website: ${data.website}</p>
                </a>
                <p>Address: ${data.address}</p>
                <p>Founded: ${data.founded}</p>
                <p>Colors: ${data.clubColors}</p>
                <p>Venue: ${data.venue}</p>
              </div>
            </div>
          </div>
        </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function (teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    teams.forEach(function (team) {

      articlesHTML += `
                <div class="row">
                  <div class="col s12 m6 l3">
                    <div class="card">
                      <a href="./team.html?id=${team.id}&saved=true">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${team.crestUrl}" />
                        </div>
                      </a>
                      <div class="card-content">
                        <span class="card-title truncate">${team.name}</span>
                        <a href="${team.website}">
                          <p>${team.website}</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (teams) {
    articleHTML = '';
    var articleHTML = `
    <div class = "row">
      <div class="col s12 m3">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${teams.crestUrl}" />
          </div>
        </div>
      </div>
      <div class="col s12 m9">
        <div class="card">
          <div class="card-content">
            <span class="card-title">${teams.name}</span>
            <a href="${teams.website}">
              <p>Website: ${teams.website}</p>
            </a>
            <p>Address: ${teams.address}</p>
            <p>Founded: ${teams.founded}</p>
            <p>Colors: ${teams.clubColors}</p>
            <p>Venue: ${teams.venue}</p>
          </div>
        </div>
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}