import React from "react";
import './matchSearch.css';

interface Props { }
interface isState {
}

export default class MatchSearch extends React.Component<any, isState> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const matchRes = this.props.searchRe;
        const searchVal = this.props.searchVal;
        let regExp = new RegExp(searchVal, 'g');
        const newRes: Array<string> = [];
        matchRes.map((item: string) => {
            const newItem = item.replace(regExp, `<span style='color: #9f95f7;'>${searchVal}</span>`);
            newRes.push(newItem);
        });
        return (
            <div className="match-list">
                <ul className="match-ul">
                    {
                        newRes.map((item: string, index: number) => 
                            <li dangerouslySetInnerHTML={{__html: item}} className="item-li" key={index.toString()}>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}