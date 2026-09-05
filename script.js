document.addEventListener("DOMContentLoaded", () => {

    startIntro();

    initThree();

    initButtons();

});


/* =========================
   LOGO INTRO
========================= */

function startIntro() {

    const intro = document.getElementById("intro-screen");
    const mainSite = document.getElementById("main-site");

    setTimeout(() => {

        intro.classList.add("exit");

        mainSite.classList.add("visible");

    }, 3000);


    setTimeout(() => {

        intro.style.display = "none";

    }, 4300);

}


/* =========================
   THREE.JS
========================= */

function initThree() {

    const canvas =
        document.getElementById("three-canvas");

    const container =
        document.getElementById("viewer-container");


    /* SCENE */

    const scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(0xdedbd4);


    /* CAMERA */

    const camera =
        new THREE.PerspectiveCamera(
            35,
            container.clientWidth /
            container.clientHeight,
            0.1,
            1000
        );

    camera.position.set(
        12,
        8,
        14
    );


    /* RENDERER */

    const renderer =
        new THREE.WebGLRenderer({

            canvas: canvas,

            antialias: true,

            alpha: false,

            powerPreference: "high-performance"

        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;


    /* =========================
       LIGHTING
    ========================== */

    const ambientLight =
        new THREE.HemisphereLight(
            0xffffff,
            0x888888,
            2
        );

    scene.add(ambientLight);


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    sun.position.set(
        10,
        20,
        10
    );

    sun.castShadow = true;

    scene.add(sun);


    /* =========================
       BUILDING
    ========================== */

    const building =
        new THREE.Group();

    scene.add(building);


    /* MAIN TOWER */

    const towerGeometry =
        new THREE.BoxGeometry(
            7,
            12,
            6
        );

    const towerMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xd8d4cc,

            roughness: .8,

            metalness: 0

        });


    const tower =
        new THREE.Mesh(
            towerGeometry,
            towerMaterial
        );

    tower.position.y = 6;

    tower.castShadow = true;

    tower.receiveShadow = true;

    building.add(tower);


    /* =========================
       WINDOWS
    ========================== */

    const windowGeometry =
        new THREE.BoxGeometry(
            .9,
            1.4,
            .08
        );


    const windowMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x263746,

            roughness: .25,

            metalness: .4

        });


    for (
        let floor = 0;
        floor < 8;
        floor++
    ) {

        for (
            let column = 0;
            column < 5;
            column++
        ) {

            const window =
                new THREE.Mesh(
                    windowGeometry,
                    windowMaterial
                );


            window.position.x =
                -2.5 +
                column * 1.25;


            window.position.y =
                1.5 +
                floor * 1.35;


            window.position.z =
                3.03;


            building.add(window);

        }

    }


    /* =========================
       BALCONIES
    ========================== */

    const balconyGeometry =
        new THREE.BoxGeometry(
            6.5,
            .15,
            1.3
        );


    const balconyMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xbab5ac,

            roughness: .9

        });


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const balcony =
            new THREE.Mesh(
                balconyGeometry,
                balconyMaterial
            );


        balcony.position.set(
            0,
            2.2 + i * 1.7,
            3.5
        );


        balcony.castShadow = true;

        building.add(balcony);

    }


    /* =========================
       SIDE WING
    ========================== */

    const wingGeometry =
        new THREE.BoxGeometry(
            4,
            5,
            5
        );


    const wing =
        new THREE.Mesh(
            wingGeometry,
            towerMaterial
        );


    wing.position.set(
        -5.5,
        2.5,
        0
    );


    wing.castShadow = true;

    building.add(wing);


    /* =========================
       ROOF
    ========================== */

    const roofGeometry =
        new THREE.BoxGeometry(
            7.5,
            .35,
            6.5
        );


    const roof =
        new THREE.Mesh(
            roofGeometry,
            new THREE.MeshStandardMaterial({

                color: 0x77736d,

                roughness: .7

            })
        );


    roof.position.y = 12.2;

    building.add(roof);


    /* =========================
       ENTRANCE
    ========================== */

    const entranceGeometry =
        new THREE.BoxGeometry(
            2.2,
            2.8,
            .4
        );


    const entrance =
        new THREE.Mesh(
            entranceGeometry,
            new THREE.MeshStandardMaterial({

                color: 0x303030,

                roughness: .3

            })
        );


    entrance.position.set(
        0,
        1.4,
        3.25
    );


    building.add(entrance);


    /* =========================
       GROUND
    ========================== */

    const ground =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                100,
                100
            ),

            new THREE.MeshStandardMaterial({

                color: 0xc9c5bd,

                roughness: 1

            })

        );


    ground.rotation.x =
        -Math.PI / 2;

    ground.receiveShadow = true;

    scene.add(ground);


    /* =========================
       PATH
    ========================== */

    const path =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                3,
                18
            ),

            new THREE.MeshStandardMaterial({

                color: 0xa8a39b,

                roughness: 1

            })

        );


    path.rotation.x =
        -Math.PI / 2;

    path.position.set(
        0,
        .01,
        10
    );


    scene.add(path);


    /* =========================
       TREES
    ========================== */

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const trunk =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    .12,
                    .18,
                    1.8,
                    8
                ),

                new THREE.MeshStandardMaterial({

                    color: 0x695546

                })

            );


        const leaves =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    1,
                    12,
                    12
                ),

                new THREE.MeshStandardMaterial({

                    color: 0x596a56,

                    roughness: 1

                })

            );


        const tree =
            new THREE.Group();


        trunk.position.y = .9;

        leaves.position.y = 2.1;


        tree.add(trunk);

        tree.add(leaves);


        tree.position.set(

            (Math.random() > .5 ? 1 : -1)
            *
            (7 + Math.random() * 4),

            0,

            Math.random() * 20 - 5

        );


        scene.add(tree);

    }


    /* =========================
       CONTROLS
    ========================== */

    const controls =
        new THREE.OrbitControls(
            camera,
            renderer.domElement
        );


    controls.enableDamping = true;

    controls.dampingFactor = .05;

    controls.enablePan = false;

    controls.minDistance = 10;

    controls.maxDistance = 30;

    controls.maxPolarAngle =
        Math.PI / 2.05;


    controls.target.set(
        0,
        5,
        0
    );


    /* =========================
       AUTO ROTATION
    ========================== */

    controls.autoRotate = true;

    controls.autoRotateSpeed = .5;


    /* Stop auto rotation when user interacts */

    controls.addEventListener(
        "start",
        () => {

            controls.autoRotate = false;

        }
    );


    /* =========================
       RESIZE
    ========================== */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                container.clientWidth /
                container.clientHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(

                container.clientWidth,

                container.clientHeight

            );

        }
    );


    /* =========================
       ANIMATION
    ========================== */

    function animate() {

        requestAnimationFrame(
            animate
        );


        controls.update();


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* =========================
       REMOVE LOADING
    ========================== */

    setTimeout(() => {

        const loading =
            document.getElementById(
                "loading-screen"
            );

        loading.classList.add(
            "hidden"
        );

    }, 1000);


    /* SAVE REFERENCES */

    window.propertyScene = scene;

    window.propertyCamera = camera;

    window.propertyRenderer =
        renderer;

    window.propertyControls =
        controls;

}


/* =========================
   BUTTONS
========================= */

function initButtons() {

    const fullscreenButton =
        document.getElementById(
            "fullscreen-btn"
        );


    fullscreenButton.addEventListener(
        "click",
        () => {

            const viewer =
                document.getElementById(
                    "viewer-container"
                );


            if (
                !document.fullscreenElement
            ) {

                viewer.requestFullscreen();

            } else {

                document.exitFullscreen();

            }

        }
    );


    /* =========================
       AR BUTTON
    ========================== */

    const arButton =
        document.getElementById(
            "ar-button"
        );


    const arModel =
        document.getElementById(
            "ar-model"
        );


    arButton.addEventListener(
        "click",
        async () => {

            try {

                arModel.style.display =
                    "block";


                await arModel.updateComplete;


                if (
                    arModel.canActivateAR
                ) {

                    await arModel.activateAR();

                } else {

                    alert(
                        "AR is not supported on this device."
                    );

                }

            } catch (error) {

                console.error(
                    "AR Error:",
                    error
                );

                alert(
                    "Unable to launch AR on this device."
                );

            }

        }
    );

}
