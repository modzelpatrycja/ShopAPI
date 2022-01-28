import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Client extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Clients: [],
            modalTitle: "",
            ClientId: 0,
            ClientName: "",
            ClientLastName: "",
            City: "",
        }
    }

    refresh() {

        fetch(variables.API_URL + 'Client')
            .then(response => response.json())
            .then(data => {
                this.setState({ Clients: data });
            });
    }

    componentDidMount() {
        this.refresh();
    }
    changeClientName = (e) => {
        this.setState({ ClientName: e.target.value });
    }

    changeClientLastName = (e) => {
        this.setState({ ClientLastName: e.target.value });
    }

    changeCity = (e) => {
        this.setState({ City: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Client",
            ClientId: 0,
            ClientName: "",
            ClientLastName: "",
            City: "",
        });
    }
    editClick(Client) {
        this.setState({
            modalTitle: "Edit Client",
            ClientId: Client.ClientId,
            ClientName: Client.ClientName,
            ClientLastName: Client.ClientLastName,
            City: Client.City,
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Client', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ClientName: this.state.ClientName,
                ClientLastName: this.state.ClientLastName,
                City: this.state.City,
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
        fetch(variables.API_URL + 'Client', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ClientId: this.state.ClientId,
                ClientName: this.state.ClientName,
                ClientLastName: this.state.ClientLastName,
                City: this.state.City,
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
            fetch(variables.API_URL + 'Client/' + id, {
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

    render() {
        var {
            Clients,
            modalTitle,
            ClientId,
            ClientName,
            ClientLastName,
            City,
        } = this.state;

        return (
            <div style={{ backgroundColor: "#666666" }}>
                <button type="button"
                    className="btn add-button" style={{marginLeft: "5px"}}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                        Add Client
                </button>
                <table className="table data-table">
                    <thead>
                        <tr>
                            <th>
                                Client
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                City
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Clients.map(Client =>
                            <tr key={Client.ClientId}>
                                <td>{Client.ClientName}</td><td>{Client.ClientLastName}</td>
                                <td>{Client.City}</td>
                                <td>
                                    <button type="button"
                                        className="btn edit-button" style={{ marginRight: '5px' }} data-bs-toggle="modal"   data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(Client)}>
                                        Edit</button>
                                    <button type="button" style={{marginRight: '5px' }}
                                        className="btn delete-button"
                                        onClick={() => this.deleteClick(Client.ClientId)}>
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
                                            <span className="input-group-text">Name</span>
                                            <input type="text" className="form-control"
                                                value={ClientName}
                                                onChange={this.changeClientName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Last Name</span>
                                            <input type="text" className="form-control"
                                                value={ClientLastName}
                                                onChange={this.changeClientLastName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">City</span>
                                            <input type="text" className="form-control"
                                                value={City}
                                                onChange={this.changeCity} />
                                        </div>


                                    </div>
                                </div>
                                {ClientId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {ClientId != 0 ?
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