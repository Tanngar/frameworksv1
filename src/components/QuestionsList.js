import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }

    componentDidMount() {
       fetch('http://localhost:8080/questions')
           .then(res => res.json())
           .then((data) => {
               this.setState({ questions: data })
               console.log(this.state.questions)
           })
    }

    render() {
        return (
            <div>
                <h3>Question List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Latest questions</th>
                    </tr>
                    </thead>
                    {this.state.questions.map((questions) => (
                        <tbody>
                        <div className="media-body">
                            <h4 className="media-heading"><Link
                                to={"/questions/" + questions._id}>{questions.title}</Link></h4>
                            <p>{questions.description}</p>
                        </div>
                        </tbody>
                    ))}
                </table>
            </div>
        );
    }
}

export default QuestionList

