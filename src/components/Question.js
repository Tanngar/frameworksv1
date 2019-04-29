import React, { Component } from 'react';
import {Link} from "react-router-dom";
import AnswersList from "./AnswersList";

export default class Question extends Component {
    constructor(match, props) {
        super(props);

        this.state = {
            title: String,
            description: String
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/questions/'+ this.props.match.params.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    title: data[0].title,
                    description: data[0].description,
                })
            })
    }

    render() {
        return (
            <div>
                <div className="media-body">
                    <h4 className="media-heading">{this.state.title}</h4>
                    <p>{this.state.description}</p>
                    <Link to={"/answers/add-answer/" + this.props.match.params.id}>Add comment</Link>
                </div>
                <AnswersList id={this.props.match.params.id}/>
            </div>
        );
    }
}