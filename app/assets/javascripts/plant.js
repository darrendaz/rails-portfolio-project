$(function () {
  getPlant()
})

function getPlant() {
  if ($("#plant").data("id")) {
    const plant_id = $("#plant").data("id")
    $.ajax({
      url: 'http://localhost:3000/plants/' + plant_id,
      method: 'get',
      dataType: 'json',
    }).done(data => plantRequestCallback(data))
  }
}

function plantRequestCallback(data) {
  const element = document.getElementById("plant")
  let plant = new Plant(data)
  if (element) {
    element.innerHTML += plant.plantHTML();
  }
}

class Plant {
  constructor(object) {
    this.id = object.id
    this.name = object.name
    this.species = object.species
    this.strain = object.strain
    this.type = object.type
    this.sex = object.sex
    this.time_until_harvest = object.time_until_harvest
    this.comments = object.comments
  }
}

Plant.prototype.plantHTML = function () {
  let plantCommentsHTML = this.comments.map(comment => {
    let timeStamp = new Date(Date.parse(comment.created_at))
    return (`
      <li>
        <small><b>${timeStamp}</b>: ${comment.contents}</small>
      </li>
    `)
  }).join('')
  return (`
    <div id="plant-data">
      <h2>Plant name: ${this.name}</h2>
      <p>Species: ${this.species}</p>
      <p>Strain: ${this.strain}</p>
      <p>Type: ${this.type}</p>
      <p>Sex: ${this.sex}</p>
      <p>Time Until Harvest: ${this.time_until_harvest}</p>
      <div id="plant-comments">
        <h3>Comments:</h3>
          <ul id="display-comments">
            ${plantCommentsHTML}
          </ul>
      <div>
    </div>
  `)
}