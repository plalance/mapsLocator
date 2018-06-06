<?php
/**
 * Created by PhpStorm.
 * User: Paul
 * Date: 27/09/2016
 * Time: 10:41
 */

// set request options

if (isset($_GET["latitude"]) && isset($_GET["longitude"])) {
    $lat = $_GET["latitude"];
    $lng = $_GET["longitude"];

//    $lat = 47.137985;
//    $lng = 4.950319900000068;

    $responseStyle = 'long'; // the length of the response
    $citySize = 'cities5000'; // the minimal number of citizens a city must have
    $radius = 20; // the radius in KM
    $maxRows = 20; // the maximum number of rows to retrieve
    $username = 'LALANCEWD'; // the username of your GeoNames account

// get nearby cities based on range as array from The GeoNames API
    $nearbyCities = json_decode(file_get_contents('http://api.geonames.org/findNearbyPlaceNameJSON?lat=' . $lat .
        '&lng=' . $lng .
        '&style=' . $responseStyle .
        '&cities=' . $citySize .
        '&radius=' . $radius .
        '&maxRows=' . $maxRows .
        '&username=' . $username
    ));

    $data = json_encode((array)$nearbyCities);
    echo $data;

//echo '<pre>'; print_r($nearbyCities); echo '</pre>';

//    $listing = array();
//    foreach ($nearbyCities->geonames as $OneCityDetail) {
//        // do something per nearby city
//        echo '<pre>'; print_r($OneCityDetail); echo '</pre>';
//    };

}






//if (isset($_GET["latitude"]) && isset($_GET["longitude"])) {
//    echo "<p>Latitude =".$_GET["latitude"]."</p>";
//    echo "<p>Longitude =".$_GET["longitude"]."</p>";
//}