import $ from 'jQuery';
import { addAnimalGif } from './fetch-gif';
import './assets/images/*.png';

function addThingButtonListener(thing) {
  const thingBox = $(`#${thing.name}`);
  thingBox.on('click', '.feedthing', function(event) {
    event.preventDefault;
    thing.feed();
  });
  thingBox.on('click', '.napthing', function(event) {
    event.preventDefault();
    thing.nap();
  });
  thingBox.on('click', '.plaything', function(event) {
    event.preventDefault();
    thing.play();
  });
  thingBox.on('click', '.killthing', function(event) {
    event.preventDefault();
    thing.gameOver = true;
  });
}

export function addNewthing(thing, thingType) {
  let thingHTML = `<div class='thingBox' id='${thing.name}'><img class="thingPic" src='assets/images/thing-${thingType}.png'><h3>${thing.name}</h3><br><h6>Neediness Level: <span id='needinessValue${thing.name}'></span><div class='row'>`;
  thingHTML += `<div class = 'col-md-3'><h5>Hunger</h5><br><span id='hungerValue${thing.name}'></span><br><button class='btn btn-info feedthing'>Feed!</button></div>`;
  thingHTML += `<div class = 'col-md-3'><h5>Fatigue</h5><br><span id='fatigueValue${thing.name}'></span><br><button class='btn btn-info napthing'>Nap!</button></div>`;
  thingHTML += `<div class = 'col-md-3'><h5>Mood</h5><br><span id='moodValue${thing.name}'></span><br><button class='btn btn-info plaything'>Play!</button></div>`;
  thingHTML += `<div class = 'col-md-3'><span id='animalGIF${thing.name}'></span></div></div>`;
  thingHTML += `<div class = 'row'><div class = 'col-md-4'></div><div class = 'col-md-4'><button class='btn btn-warning killthing'>Kill This thing!</button></div><div class = 'col-md-4'></div></div>`;
  $('#thingList').append(thingHTML);
  addThingButtonListener(thing);
  addAnimalGif(thingType, $(`#animalGIF${thing.name}`));
  setInterval(()=>{
    if (thing.gameOver === false) {
      const needySpan = $(`#needinessValue${thing.name}`);
      const hungerSpan = $(`#hungerValue${thing.name}`);
      const fatigueSpan = $(`#fatigueValue${thing.name}`);
      const moodSpan = $(`#moodValue${thing.name}`);
      needySpan.html(thing.needinessLevel);
      hungerSpan.html(thing.hunger);
      fatigueSpan.html(thing.fatigue);
      moodSpan.html(thing.mood);
    } else {
      $(`#${thing.name}`).html(`<img class="thingPic" src='assets/images/thing-dead.png'>Game Over! ${thing.name} died because you're terrible! How do you live with yourself?`);
      $(`#${thing.name}`).addClass('gameOver');
      return;
    }
  });
}