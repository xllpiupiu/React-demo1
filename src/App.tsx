import React from 'react';
import './App.scss'
import AutoComponent from './AutoComponent';
export default class App extends React.Component<any> {
    constructor(props: string) {
        super(props);

    }


    render() {
        return (
            <AutoComponent />
        );
    }
}