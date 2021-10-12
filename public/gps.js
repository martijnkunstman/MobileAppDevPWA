document.addEventListener("init", function (event) {

    if (event.target.id == "tab5") {
        var gps = document.getElementById("gps");

        console.log("gps");

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                gps.innerHTML = "Geolocation is not supported by this browser.";
            
            }
        }

        function showPosition(position) {
            gps.innerHTML = "Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude;
                var mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 13);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoibWFydGlqbmt1bnN0bWFuIiwiYSI6ImNrdW9vNWRwNDE1b2wzMHRodm5yNHgyanYifQ.iyGiDrajHBAreS-XOV_WgQ'
                }).addTo(mymap);
        
            }
        
        getLocation()
    }

});