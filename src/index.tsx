import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { GridHelper } from 'three';
import { Canvas, extend } from 'react-three-fiber';

import './index.css';
import { Camera } from './camera';
import * as SETTINGS from './settings';
import { useStore } from './store';
import { VectorsAddGroup } from './ui';
import { Menu } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

extend({ GridHelper });

function VectorContainer() {
    const vectors = useStore(state => state.vectors);

    return (
        <group>
            {vectors}
        </group>
    );
}

function CustomDrawer(props : any) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            {...props}
            className={"drawer " + (collapsed ? "drawer-collapsed" : "")}
        >
            <IconButton className={"drawer-collapse-button"}
                onClick={() => setCollapsed(!collapsed)}
            >
                <Menu />
            </IconButton>
            {collapsed ? null : props.children}
        </div>
    )
}

ReactDOM.render(
    <div className={"container"}>
        <CustomDrawer hidden={false}>
            <button onClick={() => SETTINGS.toggleCameraAutoRotate()}>Toggle Autorotate</button>
            <VectorsAddGroup />
        </CustomDrawer>
        <div className={"graph"}>
            <Canvas className={"canvas"}>
                <group rotation={[0, 0, 0]}>
                    <axesHelper rotation={[-Math.PI / 2, 0, -Math.PI / 2]}/>
                    <gridHelper />
                    <VectorContainer />
                </group>
                <ambientLight />
                <pointLight position={[10, 10, 10]}/>
                {/* <Box position={[-1.2, 0, 0]}/>
                <Box position={[1.2, 0, 0]}/> */}
                <Camera />
            </Canvas>
        </div>
    </div>,
    document.getElementById('root')
);
