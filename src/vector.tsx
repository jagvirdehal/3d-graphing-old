import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { GroupProps, MeshProps, Vector3, Euler } from 'react-three-fiber';

import * as SETTINGS from './settings';

export interface ObjectProps {
    position?: Vector3;
    scale?: Vector3;
    rotation?: Euler;
}

export interface VectorProps extends ObjectProps {
    target: Vector3,
    name: string,
    
    mesh?: {
        head?: MeshProps,
        body?: MeshProps,
    },
    size?: number,
    color?: string | number | THREE.Color,
}

interface VectorState {
    size: number,
    length: number,
}

function getRotation(pos : THREE.Vector3) : [xRot : number, yRot : number, zRot : number] {
    let yrot, zrot;

    yrot = Math.acos(pos.x / Math.sqrt(pos.x ** 2 + pos.z ** 2));
    if (pos.z < 0) {
        yrot *= -1;
    }
    zrot = Math.acos(pos.y / Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2));

    yrot = yrot ? -yrot : 0;
    zrot = zrot ? -zrot : 0;

    return [0, yrot, zrot];
}

export function Vector(props : VectorProps) {
    const meshHead = useRef();
    const meshBody = useRef();
    const material = <meshStandardMaterial color={props.color} />

    const [x, y, z] = props.target as number[];

    const target = SETTINGS.Z_UP ?
            new THREE.Vector3(y, z, x) :
            new THREE.Vector3(x, y, z);
            
    const rotation = getRotation(target);

    const [size, setSize] = useState(props.size ? props.size : 0.15);
    const [length, setLength] = useState(Math.sqrt(
        target.x ** 2 +
        target.y ** 2 +
        target.z ** 2
    ));

    const propsHead = props.mesh && props.mesh.head ?
        props.mesh.head :
        [];
    const propsBody = props.mesh && props.mesh.body ?
        props.mesh.body :
        [];

    return (
        <group {...props as GroupProps}>
            <group rotation={rotation}>
                <mesh
                    {...propsHead}
                    ref={meshHead}
                    position={[0, length - size, 0]}
                >
                    <coneBufferGeometry args={[size, 2 * size, SETTINGS.VECTOR_ROUNDNESS]}/>
                    {material}
                </mesh>
                <mesh
                    {...propsBody}
                    ref={meshBody}
                    position={[0, length / 2 - size, 0]}
                >
                    <cylinderBufferGeometry
                        args={[size / 2, size / 2, length - 2 * size, SETTINGS.VECTOR_ROUNDNESS]}
                    />
                    {material}
                </mesh>
            </group>
        </group>
    );
}

/*
export class VectorOLD extends React.Component<VectorProps,VectorState> {
    private target : THREE.Vector3;

    constructor(props: VectorProps) {
        super(props);

        const [x, y, z] = this.props.target as number[];
        
        this.target = SETTINGS.Z_UP ?
            new THREE.Vector3(y, z, x) :
            new THREE.Vector3(x, y, z);

        this.state = {
            size: (this.props.size) ? this.props.size : 0.15,
            length: Math.sqrt(
                this.target.x ** 2 +
                this.target.y ** 2 +
                this.target.z ** 2
            ),
        };
    }

    getMaterial() {
        return(
            <meshStandardMaterial color={this.props.color} />
        );
    }

    getRotation() : [x: number, y: number, z: number] {
        const pos = this.target;

        let yrot, zrot;

        yrot = Math.acos(pos.x / Math.sqrt(pos.x ** 2 + pos.z ** 2));
        if (pos.z < 0) {
            yrot *= -1;
        }
        zrot = Math.acos(pos.y / Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2));

        yrot = yrot ? -yrot : 0;
        zrot = zrot ? -zrot : 0;

        console.log(0, yrot, zrot);

        return [0, yrot, zrot];
    }

    renderHead() {
        const props = this.props.mesh && this.props.mesh.head ?
            this.props.mesh.head :
            [];
        
        return (
            <mesh
                {...props}
                position={[0, this.state.length - this.state.size, 0]}
            >
                <coneBufferGeometry args={[this.state.size, 2 * this.state.size, SETTINGS.VECTOR_ROUNDNESS]}/>
                {this.getMaterial()}
            </mesh>
        );
    }

    renderBody() {
        const props = this.props.mesh && this.props.mesh.body ?
            this.props.mesh.body :
            [];

        return (
            <mesh
                {...props}
                position={[0, this.state.length / 2 - this.state.size, 0]}
            >
                <cylinderBufferGeometry args={[this.state.size / 2, this.state.size / 2, this.state.length - 2 * this.state.size, SETTINGS.VECTOR_ROUNDNESS]}/>
                {this.getMaterial()}
            </mesh>
        );
    }

    render() {
        return (
            <group
                {...this.props as GroupProps}
            >
                <group
                    rotation={this.getRotation()}
                >
                    {this.renderHead()}
                    {this.renderBody()}
                </group>
            </group>
        );
    }
};
*/
