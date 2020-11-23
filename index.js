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
        this.origin = origin;
        this.pos = pos;
        this.size = 0.15;
        this.length = 2;

        const vHeadGeo = new THREE.CylinderGeometry(0, this.size, 2 * this.size, 32);
        const vHead = new THREE.Mesh(vHeadGeo);
        vHead.translateY(this.length - this.size);
        vHead.updateMatrix();

        const vBodyGeo = new THREE.CylinderGeometry(this.size / 2, this.size / 2, this.length - 2 * this.size, 32);
        const vBody = new THREE.Mesh(vBodyGeo);
        vBody.translateY(this.length / 2 - this.size);
        vBody.updateMatrix();

        const vGeo = new THREE.Geometry();
        const vMat = new THREE.MeshBasicMaterial({ color: 0x00aaff });
        vGeo.merge(vHead.geometry, vHead.matrix);
        vGeo.merge(vBody.geometry, vBody.matrix);

        this.vector = new THREE.Mesh(vGeo, vMat);
        this.vector.position.add(origin);
    }

    update() {
        this.vector.geometry.scale(1, 1, 1);
    }
}

const origin = new THREE.Vector3(0, 0, 0);
const pos = new THREE.Vector3(0, 0, 0);

const v = new Vector(origin,pos);
v.vector.rotation.set(0, 0, 1/16 * Math.PI);
scene.add(v.vector);

const animate = function () {
    requestAnimationFrame(animate);

    // Update orbital camera
    controls.update();
    v.update();
    v.vector.rotation.y += 0.1;

    renderer.render(scene, camera);
};

animate();