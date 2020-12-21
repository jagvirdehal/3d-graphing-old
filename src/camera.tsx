import { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';

extend({ OrbitControls });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'orbitControls': ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
        }
    }
}

export function Camera(props : any) {
    const {
        camera,
        gl: { domElement },
    } = useThree();

    const controls = useRef<OrbitControls>();
    useFrame((state) => {
        if (controls.current)
            controls.current.update();
    });

    return (
        <orbitControls ref={controls} args={[camera, domElement]}/>
    )
}