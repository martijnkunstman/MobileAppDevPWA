document.addEventListener("init", function (event) {
    if (event.target.id == "tab3") {

        let textSubmit = document.getElementById("textSubmit");
        let textInput = document.getElementById("textInput");
        let textData = document.getElementById("textData");

        textSubmit.addEventListener("click", function () {

            fetch('/postdata', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postData: textInput.value })
            }).then(res => res.json()).then(res => { console.log(res.status); getData() });

            textInput.value = "";
        })

        function getData() {
            fetch('/data')
                .then(res => res.json())
                .then(res => {
                    console.log(res.data);
                    textData.innerHTML = res.data;
                });
        }
        getData();
        setInterval(getData, 5000);
    };


    if (event.target.id == "tab2") {


        let x = 0
        let y = 0;
        let z = 0;


        const gyroscope = new Gyroscope({ frequency: 60 });

        gyroscope.addEventListener('reading', e => {
            //document.getElementById("m1").innerHTML = Math.round(gyroscope.x * 100) / 100;
            //document.getElementById("m2").innerHTML = Math.round(gyroscope.y * 100) / 100;
            //document.getElementById("m3").innerHTML = Math.round(gyroscope.z * 100) / 100;
        })

        gyroscope.start();

        /*
        let acl = new Accelerometer({ frequency: 60 });
        acl.addEventListener('reading', () => {
        
            let gravity = 9.8;
            let coefficient = 0.05;
        
            x = x + ((acl.x - x) * coefficient);
            y = y + ((acl.y - y) * coefficient);
            z = z + ((acl.z - z) * coefficient);
        
            document.getElementById("myRangeX").value = x / gravity;
            document.getElementById("myRangeY").value = y / gravity;
            document.getElementById("myRangeZ").value = z / gravity;
        
            document.getElementById("myRangeXValue").innerHTML = Math.round(x * 10 / gravity) / 10;
            document.getElementById("myRangeYValue").innerHTML = Math.round(y * 10 / gravity) / 10;
            document.getElementById("myRangeZValue").innerHTML = Math.round(z * 10 / gravity) / 10;
        
            engine.world.gravity.x = -x / gravity;
            engine.world.gravity.y = y / gravity;
        
        });
        
        acl.start();
        */

        // three.js webgl - cube
        // from https://webglfundamentals.org/webgl/lessons/resources/three-js-cube-with-lights.html


        var camera, scene, renderer;
        var mesh;

        init();
        animate();

        function init() {
            // Setup
            renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#canvas") });

            // Make and setup a camera.
            camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
            camera.position.z = 400;

            // Make a scene
            scene = new THREE.Scene();

            let torusGeometry = new THREE.BoxGeometry(200, 200, 200);

            // Make a material
            var material = new THREE.MeshPhongMaterial({
                ambient: 0x00505f,
                color: 0xFFC90,
                specular: 0xffffff,
                shininess: 50,
                shading: THREE.SmoothShading
            });
            let torus = new THREE.Mesh(torusGeometry, material);
            scene.add(torus);

            // Update mesh rotation using quaternion.
            const sensorAbs = new AbsoluteOrientationSensor();
            sensorAbs.onreading = () => torus.quaternion.fromArray(sensorAbs.quaternion).invert();
            sensorAbs.start();

            /*
            // Update mesh rotation using rotation matrix.
            const sensorRel = new RelativeOrientationSensor();
            let rotationMatrix = new Float32Array(16);
            sensorRel.onreading = () => {
                sensorRel.populateMatrix(rotationMatrix);
                torus.matrix.fromArray(rotationMatrix);
            };
            sensorRel.start();
            */

            // Add 2 lights.
            var light1 = new THREE.PointLight(0xff0040, 2, 0);
            light1.position.set(200, 100, 300);
            scene.add(light1);

            var light2 = new THREE.PointLight(0x0040ff, 2, 0);
            light2.position.set(-200, 100, 300);
            scene.add(light2);

        }

        function resize() {
            var width = renderer.domElement.clientWidth;
            var height = renderer.domElement.clientHeight;
            if (renderer.domElement.width !== width || renderer.domElement.height !== height) {
                renderer.setSize(width, height, false);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        }

        function animate() {
            resize();
            //mesh.rotation.x += 0.005;
            //mesh.rotation.y += 0.01;

            //mesh.rotation.x = document.getElementById('myRangeX').value * Math.PI;
            //mesh.rotation.y = document.getElementById('myRangeY').value * Math.PI;
            //mesh.rotation.z = document.getElementById('myRangeZ').value * Math.PI;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

    }
});


