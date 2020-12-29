import { stateContext } from 'react-three-fiber';
import create from 'zustand';
import { Vector, VectorProps } from './vector';

export type State = {
    vectors: JSX.Element[],
    addVector: (props: VectorProps) => void,
}

export const useStore = create<State>(set => ({
    vectors: [],
    addVector: (props) => {
        let newVector = <Vector {...props} key={props.name} />
        set(state => ({vectors: state.vectors.concat([newVector])}))
    }
}));
