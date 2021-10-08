let console1 = document.getElementById("console1");
let console2 = document.getElementById("console2");
let console3 = document.getElementById("console3");
let console4 = document.getElementById("console4");
let console5 = document.getElementById("console5");

let acl = new Accelerometer({frequency: 60});
acl.addEventListener('reading', () => {
    console1.innerHTML="Acceleration along the X-axis " + acl.x;
    console2.innerHTML="Acceleration along the Y-axis " + acl.y;
    console3.innerHTML="Acceleration along the Z-axis " + acl.z;
});

acl.start();

console5.innerHTML ="ok";

navigator.permissions.query({ name: 'ambient-light-sensor' }).then(result => {
    if (result.state === 'denied') {
        console1.innerHTML='Permission to use ambient light sensor is denied.';
        console.log('Permission to use ambient light sensor is denied.');
        return;
    }

    
    const als = new AmbientLightSensor({frequency: 20});
    als.addEventListener('activate', () => console2.innerHTML='Ready to measure EV.');
    als.addEventListener('error', event => console3.innerHTML=`Error: ${event.error.name}`);
    als.addEventListener('reading', () => {
        // Defaut ISO value.
        const ISO = 100;
        // Incident-light calibration constant.
        const C = 250;

        let EV = Math.round(Math.log2((als.illuminance * ISO) / C));
        console.log(`Exposure Value (EV) is: ${EV}`);
        console4.innerHTML=`Exposure Value (EV) is: ${EV}`;
    });

    als.start();
});