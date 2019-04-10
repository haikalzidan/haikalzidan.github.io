var dbPromised = idb.open("boladb1", 1, function (upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function saveForLater(team) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil di simpan.");
      var message = `${team.name} ditambahkan ke daftar favorit`;

      if (Notification.permission === 'granted') {
        showNotification(message);
      } else {
        console.error('Fitur notifikasi tidak diijinkan.');
      }
    }).catch(function (err) {
      console.log(err);
    });
}

function deleteFavTeam(team) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams');

      store.delete(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil di hapus");
    })
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function checkFavorite(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      }).then(function (favorite) {
        if (favorite !== undefined) {
          resolve(true);
        } else {
          reject(false);
        }
      });
  });
}

function getById(id) {
  let intId = parseInt(id);
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(intId);
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}