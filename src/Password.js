import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Password extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            Passwords: [],
            modalTitle: "",
            PasswordId: 0,
            PasswordName: "",
            UserId: "",
            ServiceName: "",
            visibility: "hidden"
        }
    }

    refresh() {

        fetch(variables.API_URL + 'Password')
            .then(response => response.json())
            .then(data => {
                this.setState({ Passwords: data });
            });

        fetch(variables.API_URL + 'user')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            });
    }

    componentDidMount() {
        this.refresh();
    }
    changePasswordName = (e) => {
        this.setState({ PasswordName: e.target.value });
    }
    changeServiceName = (e) => {
        this.setState({ ServiceName: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Password",
            PasswordId: 0,
            PasswordName: "",
            UserId: 2,
            ServiceName: "",
        });
    }
    editClick(password) {
        this.setState({
            modalTitle: "Edit Password",
            PasswordId: password.PasswordId,
            PasswordName: password.PasswordName,
            UserId: password.UserId,
            ServiceName: password.ServiceName,
        });
    }

    createClick() {
        fetch(variables.API_URL + 'password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PasswordName: this.state.PasswordName,
                UserId: this.state.UserId,
                ServiceName: this.state.ServiceName,
            })
        })
            .then(response=> response.json())
            .then((result) => {
                alert(result);
                this.refresh();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'Password', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PasswordId: this.state.PasswordId,
                PasswordName: this.state.PasswordName,
                UserId: this.state.UserId,
                ServiceName: this.state.ServiceName,
            })
        })
            .then(response=> response.json())
            .then((result) => {
                alert(result);
                this.refresh();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
            fetch(variables.API_URL + 'Password/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response=> response.json())
                .then((result) => {
                    this.refresh();
                })
    }

    setVisibility(id) {
        if (this.state.visibility == "hidden") {
            this.setState({
                visibility: "visible"
            });
        }
        else
            this.setState({ visibility: "hidden" });

    }

    render() {
        var {
            UserName = this.props.location.state.UserName,
            users,
            Passwords,
            modalTitle,
            PasswordId,
            PasswordName,
            UserId,
            ServiceName,
        } = this.state;

        return (
            <div style={{ backgroundColor: "rgb(235, 189, 235)" }}>
                <h4>User: {UserName}</h4>
                <button type="button"
                    className="btn btn-light mr-1" style={{ backgroundColor: '#BAF2BB', border: '2px solid black', marginRight: "5px", marginTop: "10px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                        Add Password
                </button>
                <button type="button" style={{ color: "black", border: "2px solid black", backgroundColor: "#BAD7F2", marginRight: '5px', marginTop: "10px" }}
                    className="btn btn-light mr-1"
                    onClick={() => this.setVisibility()}>
                    Show Passwords</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Password
                            </th>
                            <th>
                                Service Name
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Passwords.map(password =>
                            <tr key={password.PasswordId}>
                                <td style={{ visibility: this.state.visibility }}>{password.PasswordName}</td>
                                <td>{password.ServiceName}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1" style={{ color: "#549BDE", border: "2px solid black", backgroundColor: "#AED4E6", marginRight: '5px' }} data-bs-toggle="modal"   data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(password)}>
                                        Edit</button>
                                    <button type="button" style={{ color: "black", border: "2px solid black", backgroundColor: "#E05259", marginRight: '5px' }}
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(password.PasswordId)}>
                                        Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Password</span>
                                            <input type="text" className="form-control"
                                                value={PasswordName}
                                                onChange={this.changePasswordName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Service Name</span>
                                            <input type="text" className="form-control"
                                                value={ServiceName}
                                                onChange={this.changeServiceName} />
                                        </div>


                                    </div>
                                </div>
                                {PasswordId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {PasswordId != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}