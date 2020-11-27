import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.122.0/examples/jsm/controls/OrbitControls.js';

// Scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Orbital controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0,0,0);
controls.autoRotate = true;
controls.rotateSpeed = 0.5;
camera.position.set(10,6,0)

// Grid
const size = 16;
const divisions = 16;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// Vertical axis
// const material = new THREE.LineBasicMaterial({ color: 0xffffff });
// const points = [];
// points.push(new THREE.Vector3(0, 3, 0));
// points.push(new THREE.Vector3(0, -3, 0));
// const geometry = new THREE.BufferGeometry().setFromPoints(points);
// const line = new THREE.Line(geometry, material);
// scene.add(line);

class Vector {
    constructor(origin, pos) {
        // Parameters
        this.origin = origin;
        this.pos = pos;
        this.size = 0.15;
        this.length = Math.sqrt(
            this.pos.x ** 2 +
            this.pos.y ** 2 +
            this.pos.z ** 2
        );

        // Internal objects
        this.vHead;
        this.vBody;
        this.vHeadGeo;
        this.vBodyGeo;
        this.vector = new THREE.Group();

        // Materials
        this.vMat = new THREE.MeshBasicMaterial({ color: 0x00aaff });

        // Head model
        this.buildHead();

        // Body model
        this.buildBody();

        // Vector object
        this.vector.add(this.vHead, this.vBody);
        this.vector.position.add(origin);
    }

    buildHead() {
        if (this.vHeadGeo)
            this.vHeadGeo.dispose();
        this.vHeadGeo = new THREE.CylinderGeometry(0, this.size, 2 * this.size, 32);
        this.vHead = new THREE.Mesh(this.vHeadGeo, this.vMat);
        this.vHead.translateY(this.length - this.size);
        this.vHead.updateMatrix();
    }

    buildBody() {
        if (this.vBodyGeo)
            this.vBodyGeo.dispose();
        this.vBodyGeo = new THREE.CylinderGeometry(this.size / 2, this.size / 2, this.length - 2 * this.size, 32);
        this.vBody = new THREE.Mesh(this.vBodyGeo, this.vMat);
        this.vBody.translateY(this.length / 2 - this.size);
        this.vBody.updateMatrix();
    }

    lookAt(pos) {
        let yrot, zrot;
        try {
            yrot = Math.acos(pos.x / Math.sqrt(pos.x ** 2 + pos.z ** 2));
            if (pos.z < 0)
                yrot *= -1;
        } catch {
            yrot = 0;
        }
        try {
            zrot = Math.acos(pos.y / Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2));
        } catch {
            zrot = 0;
        }
        this.vector.rotation.set(0, 0, 0);
        this.vector.rotateY(-yrot);
        this.vector.rotateZ(-zrot);
    }

    update() {
        this.length = Math.sqrt(
            this.pos.x ** 2 +
            this.pos.y ** 2 +
            this.pos.z ** 2
        );

        this.buildHead();
        this.buildBody();
        this.vector.children = [];
        this.vector.add(this.vHead, this.vBody);
        this.lookAt(pos);
    }
}

const origin = new THREE.Vector3(0, 1, 0);
const pos = new THREE.Vector3(0, -1, -1);
let w = new THREE.Vector3(0, 0, 0);

const v = new Vector(origin,pos);
v.vector.getWorldDirection(w);
// v.vector.rotation.set(0, 0, 8/16 * Math.PI);
scene.add(v.vector);

let theta = 0;
const animate = function () {
    requestAnimationFrame(animate);

    // Update orbital camera
    controls.update();
    theta += 0.01;
    v.pos.x = Math.sin(theta);

    // v.length = Math.sin(x) + 1;
    v.update();
    // v.vector.rotation.y += 0.1;

    renderer.render(scene, camera);
};

animate();
var axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);