/* =========================================================
   WAIT FOR PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    startIntro();

    initThree();

    initButtons();

});


/* =========================================================
   LOGO INTRO
========================================================= */

function startIntro() {

    const intro =
        document.getElementById("intro");

    const mainSite =
        document.getElementById("main-site");


    /*
     * Logo animation runs for about 3 seconds.
     *
     * Then we:
     *
     * 1. Fade the intro away
     * 2. Reveal the website
     * 3. Remove intro from the page completely
     */

    setTimeout(() => {

        intro.classList.add("exit");

        mainSite.classList.add("visible");

    }, 3000);


    /*
     * Completely remove the intro after
     * its fade animation finishes.
     */

    setTimeout(() => {

        intro.style.display = "none";

    }, 4200);

}


/* =========================================================
   THREE.JS
========================================================= */

function initThree() {

    const canvas =
        document.getElementById("threeCanvas");

    if (!canvas) {
        console.error("3D canvas not found.");
        return;
    }


    /* -----------------------------------------------------
       SCENE
    ----------------------------------------------------- */

    const scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(0x11110f);


    /* -----------------------------------------------------
       CAMERA
    ----------------------------------------------------- */

    const camera =
        new THREE.PerspectiveCamera(
            40,
            1,
            0.1,
            1000
        );

    camera.position.set(
        18,
        11,
        22
    );


    /* -----------------------------------------------------
       RENDERER
    ----------------------------------------------------- */

    const renderer =
        new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    function resize() {

        const width =
            canvas.clientWidth;

        const height =
            canvas.clientHeight;


        if (
            width === 0 ||
            height === 0
        ) {
            return;
        }


        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height,
            false
        );

    }


    resize();

    window.addEventListener(
        "resize",
        resize
    );


    /* -----------------------------------------------------
       LIGHTING
    ----------------------------------------------------- */

    const ambient =
        new THREE.HemisphereLight(
            0xffffff,
            0x222222,
            1.8
        );

    scene.add(ambient);


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    sun.position.set(
        10,
        25,
        15
    );

    sun.castShadow = true;

    scene.add(sun);


    const fill =
        new THREE.DirectionalLight(
            0xbfc5d0,
            1
        );

    fill.position.set(
        -15,
        10,
        -10
    );

    scene.add(fill);


    /* -----------------------------------------------------
       MATERIALS
    ----------------------------------------------------- */

    const buildingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd9d5cc,
            roughness: 0.72
        });


    const darkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x242521,
            roughness: 0.4
        });


    const glassMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x53616b,
            roughness: 0.15,
            metalness: 0.1
        });


    const greenMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x263127,
            roughness: 1
        });


    const groundMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x8c8b82,
            roughness: 1
        });


    /* -----------------------------------------------------
       BUILDING
    ----------------------------------------------------- */

    const building =
        new THREE.Group();

    scene.add(building);


    /* Main tower */

    const tower =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                9,
                15,
                7
            ),
            buildingMaterial
        );

    tower.position.y = 7.5;

    tower.castShadow = true;

    tower.receiveShadow = true;

    building.add(tower);


    /* -----------------------------------------------------
       WINDOWS
    ----------------------------------------------------- */

    const windowGeometry =
        new THREE.BoxGeometry(
            0.85,
            1.15,
            0.12
        );


    for (
        let floor = 0;
        floor < 9;
        floor++
    ) {

        for (
            let col = -4;
            col <= 4;
            col += 2
        ) {

            const window =
                new THREE.Mesh(
                    windowGeometry,
                    glassMaterial
                );

            window.position.set(
                col,
                2.2 + floor * 1.45,
                3.56
            );

            building.add(window);

        }

    }


    /* -----------------------------------------------------
       BALCONIES
    ----------------------------------------------------- */

    for (
        let floor = 1;
        floor < 8;
        floor++
    ) {

        const balcony =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.8,
                    0.18,
                    1.5
                ),
                darkMaterial
            );

        balcony.position.set(
            -2.6,
            floor * 1.6 + 0.5,
            4.25
        );

        building.add(balcony);


        const railing =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.8,
                    0.8,
                    0.08
                ),
                glassMaterial
            );

        railing.position.set(
            -2.6,
            floor * 1.6 + 0.9,
            5
        );

        building.add(railing);

    }


    /* -----------------------------------------------------
       SIDE WING
    ----------------------------------------------------- */

    const sideWing =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7,
                5,
                7
            ),
            buildingMaterial
        );

    sideWing.position.set(
        7,
        2.5,
        0
    );

    sideWing.castShadow = true;

    building.add(sideWing);


    /* -----------------------------------------------------
       ROOF
    ----------------------------------------------------- */

    const roof =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                9.5,
                0.5,
                7.5
            ),
            darkMaterial
        );

    roof.position.y = 15.25;

    building.add(roof);


    /* -----------------------------------------------------
       ENTRANCE
    ----------------------------------------------------- */

    const entrance =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                4,
                2.5,
                0.5
            ),
            darkMaterial
        );

    entrance.position.set(
        0,
        1.25,
        3.7
    );

    building.add(entrance);


    /* -----------------------------------------------------
       GROUND
    ----------------------------------------------------- */

    const ground =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                80,
                80
            ),
            groundMaterial
        );

    ground.rotation.x =
        -Math.PI / 2;

    ground.receiveShadow = true;

    scene.add(ground);


    /* -----------------------------------------------------
       PATH
    ----------------------------------------------------- */

    const path =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                3.5,
                0.05,
                14
            ),
            groundMaterial
        );

    path.position.set(
        0,
        0.03,
        10
    );

    scene.add(path);


    /* -----------------------------------------------------
       TREES
    ----------------------------------------------------- */

    function createTree(
        x,
        z,
        scale
    ) {

        const tree =
            new THREE.Group();


        const trunk =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.18,
                    0.22,
                    2
                ),
                darkMaterial
            );

        trunk.position.y = 1;

        tree.add(trunk);


        const leaves =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    1.3,
                    16,
                    16
                ),
                greenMaterial
            );

        leaves.position.y = 2.5;

        tree.add(leaves);


        tree.position.set(
            x,
            0,
            z
        );

        tree.scale.setScalar(scale);

        scene.add(tree);

    }


    createTree(-10, 4, 1.2);
    createTree(-12, 10, 0.9);
    createTree(12, 5, 1.1);
    createTree(14, 12, 1.3);
    createTree(-7, 17, 0.8);
    createTree(9, 18, 0.9);


    /* -----------------------------------------------------
       CONTROLS
    ----------------------------------------------------- */

    const controls =
        new THREE.OrbitControls(
            camera,
            renderer.domElement
        );

    controls.enableDamping = true;

    controls.dampingFactor = 0.05;

    controls.minDistance = 12;

    controls.maxDistance = 38;

    controls.maxPolarAngle =
        Math.PI / 2.05;

    controls.target.set(
        0,
        7,
        0
    );


    controls.autoRotate = true;

    controls.autoRotateSpeed = 0.7;


    /* -----------------------------------------------------
       RENDER
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       LOADING SCREEN
    ----------------------------------------------------- */

    setTimeout(() => {

        const loading =
            document.getElementById(
                "viewerLoading"
            );

        if (loading) {

            loading.classList.add(
                "hidden"
            );

        }

    }, 1000);


    /* -----------------------------------------------------
       RESET
    ----------------------------------------------------- */

    document
        .getElementById("resetButton")
        .addEventListener(
            "click",
            () => {

                camera.position.set(
                    18,
                    11,
                    22
                );

                controls.target.set(
                    0,
                    7,
                    0
                );

                controls.update();

            }
        );


    /* -----------------------------------------------------
       AUTO ROTATE
    ----------------------------------------------------- */

    const rotateButton =
        document.getElementById(
            "rotateButton"
        );


    rotateButton.addEventListener(
        "click",
        () => {

            controls.autoRotate =
                !controls.autoRotate;


            rotateButton.textContent =
                controls.autoRotate
                    ? "AUTO ROTATE"
                    : "ROTATION OFF";

        }
    );


    /* -----------------------------------------------------
       FULLSCREEN
    ----------------------------------------------------- */

    const viewer =
        document.querySelector(
            ".viewer-container"
        );


    document
        .getElementById(
            "fullscreenButton"
        )
        .addEventListener(
            "click",
            async () => {

                try {

                    if (
                        !document.fullscreenElement
                    ) {

                        await viewer.requestFullscreen();

                    } else {

                        await document.exitFullscreen();

                    }

                } catch (error) {

                    console.log(
                        "Fullscreen unavailable:",
                        error
                    );

                }

            }
        );

}


/* =========================================================
   BUTTONS
========================================================= */

function initButtons() {


    /* -----------------------------------------------------
       WALKTHROUGH
    ----------------------------------------------------- */

    const walkthrough =
        document.getElementById(
            "walkthrough"
        );


    const openButtons = [
        document.getElementById(
            "walkthroughButton"
        ),
        document.getElementById(
            "finalWalkthrough"
        )
    ];


    openButtons.forEach(
        button => {

            if (!button) return;

            button.addEventListener(
                "click",
                () => {

                    walkthrough.classList.add(
                        "active"
                    );

                    document.body.style.overflow =
                        "hidden";

                }
            );

        }
    );


    document
        .getElementById(
            "closeWalkthrough"
        )
        .addEventListener(
            "click",
            () => {

                walkthrough.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }
        );


    /* -----------------------------------------------------
       AR
    ----------------------------------------------------- */

    const arViewer =
        document.getElementById(
            "arViewer"
        );


    async function launchAR() {

        arViewer.style.display =
            "block";


        try {

            await arViewer.activateAR();

        } catch (error) {

            console.log(
                "AR could not be launched:",
                error
            );

            /*
             * Keep the model visible if
             * AR isn't available.
             */

        }

    }


    document
        .getElementById("arButton")
        .addEventListener(
            "click",
            launchAR
        );


    document
        .getElementById("finalAR")
        .addEventListener(
            "click",
            launchAR
        );

}/* =========================================================
   WAIT FOR PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    startIntro();

    initThree();

    initButtons();

});


/* =========================================================
   LOGO INTRO
========================================================= */

function startIntro() {

    const intro =
        document.getElementById("intro");

    const mainSite =
        document.getElementById("main-site");


    /*
     * Logo animation runs for about 3 seconds.
     *
     * Then we:
     *
     * 1. Fade the intro away
     * 2. Reveal the website
     * 3. Remove intro from the page completely
     */

    setTimeout(() => {

        intro.classList.add("exit");

        mainSite.classList.add("visible");

    }, 3000);


    /*
     * Completely remove the intro after
     * its fade animation finishes.
     */

    setTimeout(() => {

        intro.style.display = "none";

    }, 4200);

}


/* =========================================================
   THREE.JS
========================================================= */

function initThree() {

    const canvas =
        document.getElementById("threeCanvas");

    if (!canvas) {
        console.error("3D canvas not found.");
        return;
    }


    /* -----------------------------------------------------
       SCENE
    ----------------------------------------------------- */

    const scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(0x11110f);


    /* -----------------------------------------------------
       CAMERA
    ----------------------------------------------------- */

    const camera =
        new THREE.PerspectiveCamera(
            40,
            1,
            0.1,
            1000
        );

    camera.position.set(
        18,
        11,
        22
    );


    /* -----------------------------------------------------
       RENDERER
    ----------------------------------------------------- */

    const renderer =
        new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    function resize() {

        const width =
            canvas.clientWidth;

        const height =
            canvas.clientHeight;


        if (
            width === 0 ||
            height === 0
        ) {
            return;
        }


        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();


        renderer.setSize(
            width,
            height,
            false
        );

    }


    resize();

    window.addEventListener(
        "resize",
        resize
    );


    /* -----------------------------------------------------
       LIGHTING
    ----------------------------------------------------- */

    const ambient =
        new THREE.HemisphereLight(
            0xffffff,
            0x222222,
            1.8
        );

    scene.add(ambient);


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    sun.position.set(
        10,
        25,
        15
    );

    sun.castShadow = true;

    scene.add(sun);


    const fill =
        new THREE.DirectionalLight(
            0xbfc5d0,
            1
        );

    fill.position.set(
        -15,
        10,
        -10
    );

    scene.add(fill);


    /* -----------------------------------------------------
       MATERIALS
    ----------------------------------------------------- */

    const buildingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd9d5cc,
            roughness: 0.72
        });


    const darkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x242521,
            roughness: 0.4
        });


    const glassMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x53616b,
            roughness: 0.15,
            metalness: 0.1
        });


    const greenMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x263127,
            roughness: 1
        });


    const groundMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x8c8b82,
            roughness: 1
        });


    /* -----------------------------------------------------
       BUILDING
    ----------------------------------------------------- */

    const building =
        new THREE.Group();

    scene.add(building);


    /* Main tower */

    const tower =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                9,
                15,
                7
            ),
            buildingMaterial
        );

    tower.position.y = 7.5;

    tower.castShadow = true;

    tower.receiveShadow = true;

    building.add(tower);


    /* -----------------------------------------------------
       WINDOWS
    ----------------------------------------------------- */

    const windowGeometry =
        new THREE.BoxGeometry(
            0.85,
            1.15,
            0.12
        );


    for (
        let floor = 0;
        floor < 9;
        floor++
    ) {

        for (
            let col = -4;
            col <= 4;
            col += 2
        ) {

            const window =
                new THREE.Mesh(
                    windowGeometry,
                    glassMaterial
                );

            window.position.set(
                col,
                2.2 + floor * 1.45,
                3.56
            );

            building.add(window);

        }

    }


    /* -----------------------------------------------------
       BALCONIES
    ----------------------------------------------------- */

    for (
        let floor = 1;
        floor < 8;
        floor++
    ) {

        const balcony =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.8,
                    0.18,
                    1.5
                ),
                darkMaterial
            );

        balcony.position.set(
            -2.6,
            floor * 1.6 + 0.5,
            4.25
        );

        building.add(balcony);


        const railing =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.8,
                    0.8,
                    0.08
                ),
                glassMaterial
            );

        railing.position.set(
            -2.6,
            floor * 1.6 + 0.9,
            5
        );

        building.add(railing);

    }


    /* -----------------------------------------------------
       SIDE WING
    ----------------------------------------------------- */

    const sideWing =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7,
                5,
                7
            ),
            buildingMaterial
        );

    sideWing.position.set(
        7,
        2.5,
        0
    );

    sideWing.castShadow = true;

    building.add(sideWing);


    /* -----------------------------------------------------
       ROOF
    ----------------------------------------------------- */

    const roof =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                9.5,
                0.5,
                7.5
            ),
            darkMaterial
        );

    roof.position.y = 15.25;

    building.add(roof);


    /* -----------------------------------------------------
       ENTRANCE
    ----------------------------------------------------- */

    const entrance =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                4,
                2.5,
                0.5
            ),
            darkMaterial
        );

    entrance.position.set(
        0,
        1.25,
        3.7
    );

    building.add(entrance);


    /* -----------------------------------------------------
       GROUND
    ----------------------------------------------------- */

    const ground =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                80,
                80
            ),
            groundMaterial
        );

    ground.rotation.x =
        -Math.PI / 2;

    ground.receiveShadow = true;

    scene.add(ground);


    /* -----------------------------------------------------
       PATH
    ----------------------------------------------------- */

    const path =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                3.5,
                0.05,
                14
            ),
            groundMaterial
        );

    path.position.set(
        0,
        0.03,
        10
    );

    scene.add(path);


    /* -----------------------------------------------------
       TREES
    ----------------------------------------------------- */

    function createTree(
        x,
        z,
        scale
    ) {

        const tree =
            new THREE.Group();


        const trunk =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.18,
                    0.22,
                    2
                ),
                darkMaterial
            );

        trunk.position.y = 1;

        tree.add(trunk);


        const leaves =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    1.3,
                    16,
                    16
                ),
                greenMaterial
            );

        leaves.position.y = 2.5;

        tree.add(leaves);


        tree.position.set(
            x,
            0,
            z
        );

        tree.scale.setScalar(scale);

        scene.add(tree);

    }


    createTree(-10, 4, 1.2);
    createTree(-12, 10, 0.9);
    createTree(12, 5, 1.1);
    createTree(14, 12, 1.3);
    createTree(-7, 17, 0.8);
    createTree(9, 18, 0.9);


    /* -----------------------------------------------------
       CONTROLS
    ----------------------------------------------------- */

    const controls =
        new THREE.OrbitControls(
            camera,
            renderer.domElement
        );

    controls.enableDamping = true;

    controls.dampingFactor = 0.05;

    controls.minDistance = 12;

    controls.maxDistance = 38;

    controls.maxPolarAngle =
        Math.PI / 2.05;

    controls.target.set(
        0,
        7,
        0
    );


    controls.autoRotate = true;

    controls.autoRotateSpeed = 0.7;


    /* -----------------------------------------------------
       RENDER
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       LOADING SCREEN
    ----------------------------------------------------- */

    setTimeout(() => {

        const loading =
            document.getElementById(
                "viewerLoading"
            );

        if (loading) {

            loading.classList.add(
                "hidden"
            );

        }

    }, 1000);


    /* -----------------------------------------------------
       RESET
    ----------------------------------------------------- */

    document
        .getElementById("resetButton")
        .addEventListener(
            "click",
            () => {

                camera.position.set(
                    18,
                    11,
                    22
                );

                controls.target.set(
                    0,
                    7,
                    0
                );

                controls.update();

            }
        );


    /* -----------------------------------------------------
       AUTO ROTATE
    ----------------------------------------------------- */

    const rotateButton =
        document.getElementById(
            "rotateButton"
        );


    rotateButton.addEventListener(
        "click",
        () => {

            controls.autoRotate =
                !controls.autoRotate;


            rotateButton.textContent =
                controls.autoRotate
                    ? "AUTO ROTATE"
                    : "ROTATION OFF";

        }
    );


    /* -----------------------------------------------------
       FULLSCREEN
    ----------------------------------------------------- */

    const viewer =
        document.querySelector(
            ".viewer-container"
        );


    document
        .getElementById(
            "fullscreenButton"
        )
        .addEventListener(
            "click",
            async () => {

                try {

                    if (
                        !document.fullscreenElement
                    ) {

                        await viewer.requestFullscreen();

                    } else {

                        await document.exitFullscreen();

                    }

                } catch (error) {

                    console.log(
                        "Fullscreen unavailable:",
                        error
                    );

                }

            }
        );

}


/* =========================================================
   BUTTONS
========================================================= */

function initButtons() {


    /* -----------------------------------------------------
       WALKTHROUGH
    ----------------------------------------------------- */

    const walkthrough =
        document.getElementById(
            "walkthrough"
        );


    const openButtons = [
        document.getElementById(
            "walkthroughButton"
        ),
        document.getElementById(
            "finalWalkthrough"
        )
    ];


    openButtons.forEach(
        button => {

            if (!button) return;

            button.addEventListener(
                "click",
                () => {

                    walkthrough.classList.add(
                        "active"
                    );

                    document.body.style.overflow =
                        "hidden";

                }
            );

        }
    );


    document
        .getElementById(
            "closeWalkthrough"
        )
        .addEventListener(
            "click",
            () => {

                walkthrough.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }
        );


    /* -----------------------------------------------------
       AR
    ----------------------------------------------------- */

    const arViewer =
        document.getElementById(
            "arViewer"
        );


    async function launchAR() {

        arViewer.style.display =
            "block";


        try {

            await arViewer.activateAR();

        } catch (error) {

            console.log(
                "AR could not be launched:",
                error
            );

            /*
             * Keep the model visible if
             * AR isn't available.
             */

        }

    }


    document
        .getElementById("arButton")
        .addEventListener(
            "click",
            launchAR
        );


    document
        .getElementById("finalAR")
        .addEventListener(
            "click",
            launchAR
        );

}