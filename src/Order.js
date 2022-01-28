import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Orders: [],
            modalTitle: "",
            OrdertId: 0,
            ClientId: "",
        }
    }

    refresh() {

        fetch(variables.API_URL + 'Order')
            .then(response => response.json())
            .then(data => {
                this.setState({ Orders: data });
            });
    }

    componentDidMount() {
        this.refresh();
    }
    changeClientId = (e) => {
        this.setState({ ClientId: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Order",
            OrdertId: 0,
            ClientId: "",
            Price: "",
        });
    }
    editClick(Order) {
        this.setState({
            modalTitle: "Edit Order",
            OrdertId: Order.OrdertId,
            ClientId: Order.ClientId,
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ClientId: this.state.ClientId,
            })
        })
            .then(response => response.json())
            .then((result) => {
                alert(result);
                this.refresh();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch(variables.API_URL + 'Order', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                OrdertId: this.state.OrdertId,
                ClientId: this.state.ClientId,
            })
        })
            .then(response => response.json())
            .then((result) => {
                alert(result);
                this.refresh();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        fetch(variables.API_URL + 'Order/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((result) => {
                this.refresh();
            })
    }

    render() {
        var {
            Orders,
            modalTitle,
            OrdertId,
            ClientId,
        } = this.state;

        return (
            <div style={{ backgroundColor: "#666666" }}>
                <button type="button"
                    className="btn add-button" style={{ marginLeft: "5px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Order
                </button>
                <table className="table data-table">
                    <thead>
                        <tr>
                            <th>
                                OrderId
                            </th>
                            <th>
                                ClientId
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Orders.map(Order =>
                            <tr key={Order.OrdertId}>
                                <td>{Order.OrdertId}</td><td>{Order.ClientId}</td>
                                <td>
                                    <button type="button"
                                        className="btn edit-button" style={{ marginRight: '5px' }} data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(Order)}>
                                        Edit</button>
                                    <button type="button" style={{ marginRight: '5px' }}
                                        className="btn delete-button"
                                        onClick={() => this.deleteClick(Order.OrdertId)}>
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
                                        <span className="input-group-text">ClientId</span>
                                        <input type="text" className="form-control"
                                            value={ClientId}
                                            onChange={this.changeClientId} />
                                    </div>

                                </div>
                            </div>
                            {OrdertId == 0 ?
                                <button type="button"
                                    className="btn confirm-button"
                                    onClick={() => this.createClick()}
                                >Create</button>
                                : null}

                            {OrdertId != 0 ?
                                <button type="button"
                                    className="btn confirm-button"
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