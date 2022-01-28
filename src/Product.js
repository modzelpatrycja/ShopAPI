import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Products: [],
            modalTitle: "",
            ProductId: 0,
            ProductName: "",
            Price: ""
        }
    }

    refresh() {

        fetch(variables.API_URL + 'Product')
            .then(response => response.json())
            .then(data => {
                this.setState({ Products: data });
            });
    }

    componentDidMount() {
        this.refresh();
    }
    changeProductName = (e) => {
        this.setState({ ProductName: e.target.value });
    }

    changePrice = (e) => {
        this.setState({ Price: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Product",
            ProductId: 0,
            ProductName: "",
            Price: "",
        });
    }
    editClick(Product) {
        this.setState({
            modalTitle: "Edit Product",
            ProductId: Product.ProductId,
            ProductName: Product.ProductName,
            Price: Product.Price,
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductName: this.state.ProductName,
                Price: this.state.Price,
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
        fetch(variables.API_URL + 'Product', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductId: this.state.ProductId,
                ProductName: this.state.ProductName,
                Price: this.state.Price,
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
            fetch(variables.API_URL + 'Product/' + id, {
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
            Products,
            modalTitle,
            ProductId,
            ProductName,
            Price,
        } = this.state;

        return (
            <div style={{ backgroundColor: "#666666" }}>
                <button type="button"
                    className="btn add-button" style={{marginLeft: "5px"}}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                        Add Product
                </button>
                <table className="table data-table">
                    <thead>
                        <tr>
                            <th>
                                Product
                            </th>
                            <th>
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map(Product =>
                            <tr key={Product.ProductId}>
                                <td>{Product.ProductName}</td><td>{Product.Price}</td>
                                <td>
                                    <button type="button"
                                        className="btn edit-button" style={{ marginRight: '5px' }} data-bs-toggle="modal"   data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(Product)}>
                                        Edit</button>
                                    <button type="button" style={{marginRight: '5px' }}
                                        className="btn delete-button"
                                        onClick={() => this.deleteClick(Product.ProductId)}>
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
                                            <span className="input-group-text">Product Name</span>
                                            <input type="text" className="form-control"
                                                value={ProductName}
                                                onChange={this.changeProductName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Product Price</span>
                                            <input type="text" className="form-control"
                                                value={Price}
                                                onChange={this.changePrice} />
                                        </div>

                                    </div>
                                </div>
                                {ProductId == 0 ?
                                    <button type="button"
                                    className="btn confirm-button"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {ProductId != 0 ?
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