import React, { DOMElement, MouseEventHandler, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { JsxAttribute } from 'typescript';

import * as THREE from 'three';
import { GridHelper, Mesh } from 'three';
import {Camera} from './camera';

import { Canvas, extend, MeshProps, useFrame } from 'react-three-fiber';

import './index.css';

extend({ GridHelper });

function Box(props : MeshProps) {
    const mesh = useRef<Mesh>();

    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <boxBufferGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
        </mesh>
    )
}

ReactDOM.render(
    <Canvas className={"canvas"}>
        <gridHelper />
        <ambientLight />
        <pointLight position={[10, 10, 10]}/>
        <Box position={[-1.2, 0, 0]}/>
        <Box position={[1.2, 0, 0]}/>
        <Camera />
    </Canvas>,
    document.getElementById('root')
);
