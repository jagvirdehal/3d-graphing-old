import { CSSProperties, useState } from 'react';
import { CirclePicker, ColorChangeHandler, HSLColor, RGBColor } from 'react-color';
import { useStore } from './store';


interface ColorPickerButtonProps {
    color: string | HSLColor | RGBColor,
    onChange: ColorChangeHandler,
    className?: string,
    children: any,
}

export function ColorPickerButton(props: ColorPickerButtonProps) {
    const [showPicker, setPicker] = useState(false);

    const popover = {
        position: 'absolute',
        zIndex: '2',
    }

    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }

    return (
        <div className={props.className ? props.className : ""}>
            <button onClick={() => setPicker(!showPicker)}>{props.children}</button>
            {showPicker ?
                <div style={popover as CSSProperties}>
                    <div style={cover as CSSProperties} onClick={() => setPicker(false)} />
                    <CirclePicker color={props.color} onChange={props.onChange}/>
                </div>
            : null}
        </div>
    );
}

export function VectorsAddGroup() {
    const vectors = useStore(state => state.vectors);
    const addVector = useStore(state => state.addVector);

    const [[x, y, z], setCoords] = useState([0, 0, 0]);
    const [color, setColor] = useState('#666');
    let name = `V${vectors.length + 1}`;

    return (
        <div className="vectors-add-group">
            <input className="x" type="number" value={x} onChange={(event) => setCoords([parseInt(event.target.value), y, z])}/>
            <input className="y" type="number" value={y} onChange={(event) => setCoords([x, parseInt(event.target.value), z])}/>
            <input className="z" type="number" value={z} onChange={(event) => setCoords([x, y, parseInt(event.target.value)])}/>
            <button className="addButton" onClick={() => {
                addVector({target:[x, y, z], name:name, color: color});
            }}>
                Add
            </button>
            <ColorPickerButton className="colorButton" color={color} onChange={(color: any) => setColor(color.hex)}>
                Color
            </ColorPickerButton>
        </div>
    )
}

export function VectorsListGroup() {
    const vectors = useStore(state => state.vectors);
    
}
