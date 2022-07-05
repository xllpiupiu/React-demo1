import React from 'react';
import './AutoComponent.css'
import SearchInput from './search';
import MatchSearch from './matchSearch';
import data from './data'

interface Props { }
interface isState {
    searchVal: string,
    isShow: string,
    searchRe: Array<string>,
}

export default class AutoComponent extends React.Component<any, isState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchVal: '',
            isShow: 'none',
            searchRe: [],
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(searchVal: string) {
        //使用过滤器过滤
        if (searchVal) {
            const res = data.filter((item) => item.indexOf(searchVal) !== -1);
            this.setState({searchVal: searchVal})
            this.setState({ searchRe: res }, () => {
                if (this.state.searchRe.length !== 0) {
                    this.setState({ isShow: 'block' })
                } else {
                    this.setState({ isShow: 'none' });
                }
            })
        } else {
            this.setState({ isShow: 'none' })
        }
    }

    render() {
        return (
            <div className='search-box'>
                <SearchInput onSearch={this.handleSearch} />
                <div style={{ display: this.state.isShow }}>
                    <MatchSearch searchRe={this.state.searchRe} searchVal={this.state.searchVal}/>
                </div>

            </div>
        );
    }
}