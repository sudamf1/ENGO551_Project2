// Create a request variable and assign a new XMLHttpRequest object to it.
//var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
//request.open('GET', 'https://data.calgary.ca/resource/c2es-76ed.geojson', true)

//fetch('https://data.calgary.ca/resource/c2es-76ed.geojson')
//  .then((response) => {
//    return response.json()
//  })
//  .then((data) => {
$.ajax({
dataType: "json",
url: "https://data.calgary.ca/resource/c2es-76ed.geojson",
success: function(data) {
    // Work with JSON data here

    var mymap = L.map('mapid').setView([51.0468, -114.0698], 13);
    var featureGroup = L.featureGroup();
    var geojsonLayer = L.geoJSON(data).addTo(mymap);
    var popup = L.popup();




     var layer1 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(mymap);

    var start_day;
    var end_day;

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);
    
  $(function() {
    $('input[name="daterange"]').daterangepicker({
         opens: 'left'
      }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
      start_day = start.format('YYYY-MM-DD')
      end_day = end.format('YYYY-MM-DD')

      var params = "?$where=issueddate > " + "'" + start_day + "'" + "and issueddate < " + "'" + end_day + "'";


      console.log(params);


      var geojason = data + params;
      var object = JSON.parse(geojason);
      console.log(object);
      console.log(goejason);


      markers.clearLayers();

      geojsonLayer = L.geoJson(object, {

        onEachFeature: function(feature,layer){
          marker.bindPopup("<p>Issued Date: <p>" + feature.properties.issueddate + "<br>" + "<p>Community Name: <p>" + feature.properties.communityname + "<br>" + "<p>Work Class Group: <p>" + feature.properties.workclassgroup + "<br>" + "<p>Contractor Name: <p>" + feature.properties.contractorname + "<br>" + "<p>Original Address: <p>" + feature.properties.originaladdress).openPopup;

        }
        });




      });

  });



  }

}).error(function(e) {
     console.log(e)
});
