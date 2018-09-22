'use strict';

(function(){
  let coderList;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    coderList=document.getElementById('coders');
    fetch('/all')
      .then(result=>result.json())
      .then(flavors=>populateIceCreamList(flavors))
      .catch(err=>console.log(err));
  }

  function populateIceCreamList(coders) {
    for (let coder of coders) {
      let profile=document.createElement('div');
      profile.className="profile";
      let name=document.createElement('h3');
      let dob=document.createElement('p');
      let coderImage=document.createElement('img');
      coderImage.src=`/images/${coder.photo}`;
      if (coder.photo==undefined){coderImage.src='/images/noImage.png'}
      if (coder.yearOfDeath==undefined){coder.yearOfDeath=''}
      if (coder.yearOfBirth==undefined){coder.yearOfBirth=''}
      name.textContent=coder.firstName + ' ' + coder.lastName;
      dob.textContent=coder.yearOfBirth + '-' + coder.yearOfDeath;
      profile.appendChild(name);
      profile.appendChild(coderImage);
      profile.appendChild(dob);
      coderList.appendChild(profile);
    }
  }


})();
