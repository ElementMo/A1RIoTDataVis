var AirQualityData = [];
var VitalData = [];
var ObjectData = [];
var ThermalShotsData = [];

var MAX_STANDARD = 400;
var BAR_GAP = 0.00035;

chart.showLoading(); // Show Loading Animation

AirQualityData = loadJsonFile("assets/nist_airquality_fire_data.json");
VitalData = loadJsonFile("assets/nist_firstrespondervitals_fire.json");
ObjectData = loadJsonFile("assets/nist_objects_generated_fire_data.json");
ThermalShotsData = loadJsonFile("assets/nist_firehotspots_generated_fire_data.json");


// Air Quality Data
var o2_data = [];
var co_data = [];
var h2s_data = [];
var hcn_data = [];
var lel_data = [];
var particle_data = [];
var firefighterloc_data = [];
for (var i = 0; i < AirQualityData.length; i++) {
    o2_data.push(      [AirQualityData[i].coords.longitude + BAR_GAP * 0, AirQualityData[i].coords.latitude, mapValue(AirQualityData[i].o2.value, 19, 30, 0, MAX_STANDARD)]);
    co_data.push(      [AirQualityData[i].coords.longitude + BAR_GAP * 1, AirQualityData[i].coords.latitude, mapValue(AirQualityData[i].co.value, 0, 10, 0, MAX_STANDARD)]);
    h2s_data.push(     [AirQualityData[i].coords.longitude + BAR_GAP * 2, AirQualityData[i].coords.latitude, mapValue(AirQualityData[i].h2s.value, 0, 5, 0, MAX_STANDARD)]);
    hcn_data.push(     [AirQualityData[i].coords.longitude + BAR_GAP * 3, AirQualityData[i].coords.latitude, mapValue(AirQualityData[i].hcn.value, 0, 4.7, 0, MAX_STANDARD)]);
    lel_data.push(     [AirQualityData[i].coords.longitude + BAR_GAP * 4, AirQualityData[i].coords.latitude, mapValue(AirQualityData[i].lel.value, 0, 80, 0, MAX_STANDARD)]);
    particle_data.push( [AirQualityData[i].coords.longitude + BAR_GAP * 5, AirQualityData[i].coords.latitude, mapValue(AirQualityData[i].particulate.value, 0, 150, 0, MAX_STANDARD)]);
    firefighterloc_data.push([VitalData[i].coords.longitude, VitalData[i].coords.latitude]);
}
// Vital Data
var pulse_data = [];
var spo2_data = [];
for(var i=0; i < VitalData.length; i++){
    pulse_data.push(VitalData[i].pulse.value);
    spo2_data.push(VitalData[i].spo2.value);
}
// Object Indentification Data
var building_data = [];
for(var i=0; i<ObjectData.length; i++){
    building_data.push([ObjectData[i].coords.longitude, ObjectData[i].coords.latitude, 50]);
}
// Thermal Shots Data
var drone_coord_data = [];
for(var i=0; i<ThermalShotsData.length; i++){
    drone_coord_data.push([ThermalShotsData[i].coords.longitude, ThermalShotsData[i].coords.latitude, mapValue(ThermalShotsData[i].thermal_threshold.value, 850, 1100, 1, 10)]);
}
console.log(drone_coord_data);


map.setCenter([-78.47, 38.50]);
map.setZoom(13);

var time_slices = 550;

$(function () {
    $("#slider").slider({
        min: 0,
        max: time_slices,
        value: 0,
        slide: function (event, ui) {

            // Air Quality Data
            var selected_o2 = [];
            var selected_co = [];
            var selected_h2s = [];
            var selected_hcn = [];
            var selected_lel = [];
            var selected_particle = [];
            var selected_firefighter = [];
            for(var i= 0; i<20; i++){
                selected_o2[i] = o2_data[ui.value * 20 + i];
                selected_co[i] = co_data[ui.value * 20 + i];
                selected_h2s[i] = h2s_data[ui.value * 20 + i];
                selected_hcn[i] = hcn_data[ui.value * 20 + i];
                selected_lel[i] = lel_data[ui.value * 20 + i];
                selected_particle[i] = particle_data[ui.value * 20 + i];
                selected_firefighter[i] = firefighterloc_data[ui.value * 23 + i];
            }

            // Vital Data
            var selected_pulse = [];
            var selected_spo2 = [];
            for(var i=0; i<100; i++){
                selected_pulse[i] = pulse_data[(ui.value + i) * 23];
                selected_spo2[i] = spo2_data[(ui.value + i) * 23];
            }

            // Possible Building Data
            var selected_building = [];
            for(var i=0; i<mapValue(ui.value, 0, time_slices, 0, ObjectData.length); i++){
                selected_building[i] = building_data[i];
            }

            // Drone Thermal Data
            var selected_drone_coord = [];
            for(var i=0; i< parseInt(mapValue(ui.value, 0, time_slices, 0, drone_coord_data.length)); i+=5){
                selected_drone_coord[i] = drone_coord_data[i];
            }
            // console.log(selected_drone_thermal);


            newOption = {
                series: [
                    // Air Quality Display
                    {
                        name: "o2_bar",
                        data: selected_o2
                    },
                    {
                        name: "co_bar",
                        data: selected_co
                    },
                    {
                        name: "h2s_bar",
                        data: selected_h2s
                    },
                    {
                        name: "hcn_bar",
                        data: selected_hcn
                    },
                    {
                        name: "lel_bar",
                        data: selected_lel
                    },
                    {
                        name: "particle_bar",
                        data: selected_particle
                    },
                    // Vital Display
                    {
                        name: "firefighter",
                        data: selected_firefighter
                    },
                    {
                        name: "Pulse",
                        data: selected_pulse
                    },
                    {
                        name: "spo2",
                        data: selected_spo2
                    },
                    // Building Display
                    {
                        name: "building_box",
                        data: selected_building
                    },
                    // Drone Thermal Display
                    {
                        name: "drone",
                        data: selected_drone_coord,
                    }
                ]
            }
            chart.setOption(newOption);
        }
    });
});



chart.hideLoading();



function loadJsonFile(url) {
    var result;
    $.ajax({
        dataType: 'json',
        url: url,
        async: false,
        success: function (data) {
            result = data;
        }
    });
    return result;
}

function mapValue(value, istart, istop, ostart, ostop){
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}