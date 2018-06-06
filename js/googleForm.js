/**
 * Created by Paul on 27/09/2016.
 */

var placeSearch, autocomplete;

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'short_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    var options = {
//            types: ['(cities)']
        types: ['geocode']
    };

    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        options
    );

    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

//         Get each component of the address from the place details
//         and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
    $("#lat > span").html(place.geometry.location.lat());
    $("#lon > span").html(place.geometry.location.lng());
    $("#place_id > span").html(place.place_id);
    $("#country_long > span").html(place.address_components[3]['long_name']);

    var myLatlng1 = new google.maps.LatLng(
        place.geometry.location.lat(),
        place.geometry.location.lng()
    );
    var myLatlng2 = new google.maps.LatLng(
        48.85661400000001,
        2.3522219000000177
    );

    var distance = google.maps.geometry.spherical.computeDistanceBetween(myLatlng1, myLatlng2);

    var km = (distance/1000).toFixed(3) +' km';

    $("#distance_zone >span").html(km);

}