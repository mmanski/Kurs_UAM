	global = {};
	if (!global.UAM) {

		global.UAM = {};
	}
    
    global.UAM.aircrafts = [];
    
    //////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// Sample aircraft with sample service  /////////////// 
    
    // global.UAM.aircrafts.push({
    //     code: 'SP-ABC',
    //     services: []
    // });
    
    // global.UAM.aircrafts[0].services.push({
    //     name: 'smth1',
    //     timeToExecute: 120
    // });    
    
    
    //////////////////////////////////////////////////////////////////////////////////////

    global.UAM.addAircraft = function (newAircraftCode) {
        var aircraft =  {
			 	code: newAircraftCode,
				services: [] 
			};
        global.UAM.aircrafts.push(aircraft);
        return aircraft;
    };
    

    global.UAM.removeAircraft = function (aircraftObj) {
        var index = global.UAM.aircrafts.indexOf(aircraftObj);
        if (index != -1 ) {
            global.UAM.aircrafts.splice(index, 1);
        }
    };

    global.UAM.addWorkToAircraft = function(aircraftObj, name, timeToExxecute) {
       var index = global.UAM.aircrafts.indexOf(aircraftObj);
	   var service = 	{ 
				name: name,
				timeToExecute: timeToExxecute 
			};
	   global.UAM.aircrafts[index].services.push(service);
    };
        
    global.UAM.reduceTimeToExecute = function(aircraftObj, time) {
        var index = global.UAM.aircrafts.indexOf(aircraftObj);
        var services = global.UAM.aircrafts[index].services;
        if(services) {
            services.forEach(function(service) {
                service.timeToExecute = service.timeToExecute - time;
            });
        }
    };
    
    global.UAM.getAircraftsForRepairs = function(maxTimeToExecute) {
        var aircrafts = [];
        global.UAM.aircrafts.forEach(function(aircraft) {
			if (aircraft.services) {
				aircraft.services.every(function(service) {
                    if (service.timeToExecute <= maxTimeToExecute) {
                        aircrafts.push(aircraft);
                        // break
                        return false;
                    }
                    // continue
                    return true;
                });
			 }
        });
       return aircrafts;
    };
    


/*

Przykład użycia:

var newAircraft1 = addAircraft('SP-XY1');
var newAircraft2 = addAircraft('SP-XY2');

addWorkToAircraft(newAircraft1, 'serviceXY1a', 110);
addWorkToAircraft(newAircraft1, 'serviceXY1b', 130);
reduceTimeToExecute(newAircraft1, 20);

var sxy2a = addWorkToAircraft(newAircraft2, 'serviceXY2a', 130);
var sxy2b = addWorkToAircraft(newAircraft2, 'serviceXY2b', 160);
reduceTimeToExecute(newAircraft2, 20);

getAircraftsForRepairs(100); // [ newAircraft1 ]

removeAircraft(newAircraft1);

getAircraftsForRepairs(100); // []

reduceTimeToExecute(newAircraft2, 20);

getAircraftsForRepairs(100); // [ newAircraft2 ]

*/