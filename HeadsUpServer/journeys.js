var requestify = require('requestify');

module.exports = {
  collection: [],

  init: function() {
    this.collection.push({ id: 0, routeId: 0, lng: 0, lat: 0 },
                    { id: 1, routeId: 0, lng: 0, lat: 0 });
  },
  journey0sim: [{ id: 0, routeId: 0, lng: -5.934569833162868, lat: 54.59580586666626 },
                  { id: 0, routeId: 0, lng: -5.934741494539821, lat: 54.5965206604752 },
                  { id: 0, routeId: 0, lng: -5.934827325228298, lat: 54.59708005557418 },
                  { id: 0, routeId: 0, lng: -5.932960507753933, lat: 54.597167071898944 },
                  { id: 0, routeId: 0, lng: -5.931372640017116, lat: 54.59726651889958 },
                  { id: 0, routeId: 0, lng: -5.92777847993716, lat: 54.59741568894516 },
                  { id: 0, routeId: 0, lng: -5.927574632052028, lat: 54.596147726140195 },
                  { id: 0, routeId: 0, lng: -5.929248330477321, lat: 54.59605449202281 },
                  { id: 0, routeId: 0, lng: -5.931351182344997, lat: 54.59599855144993 }],

  iterate: function() {
      if (this.i > 9){
          this.i = 0;
      }
      this.collection[0] = this.journey0sim[this.i]
      this.i++
      var self = this;
    setTimeout(function(){
      console.log("test");
        self.iterate();
    }, 3000);
  },
  simulateJourney: function() {
      this.i = 0;
      var self = this;
      this.iterate();
    }

}
