import React from "react";
import './search.css';

interface Props {
    
};
interface isState {
    inVal: string,
    ifConfirm: boolean,
    isColor: boolean,
}

export default class SearchInput extends React.Component<any, isState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            inVal: '',
            ifConfirm: true,
            isColor: false,
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleInStart = this.handleInStart.bind(this);
        this.handleInEnd = this.handleInEnd.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    handleOnFocus() {
        this.setState({isColor: true})
    }

    handleOnBlur() {
        this.setState({isColor: false})
    }

    handleInput(e: any) {
        //调用父组件函数
        this.setState({ inVal: e.target.value})
        // this.props.onSearch(e.target.value);
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
            if (this.state.ifConfirm) {
                this.props.onSearch(e.target.value);
            }
        }, 300)

    }

    handleInStart() {
        this.setState({ ifConfirm: false });
    }

    handleInEnd() {
        this.setState({ ifConfirm: true });
    }

    render() {
        const inVal = this.state.inVal;
        // 
        return (
            <div className="search-input" style={{borderColor: (this.state.isColor)? '#9f95f7': '#a09b9b'}}>
                <input id="input" 
                type="text" 
                value={inVal} 
                onChange={this.handleInput} 
                onCompositionStart={this.handleInStart}
                onCompositionEnd={this.handleInEnd}
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
                />
            </div>
        );
    }
}