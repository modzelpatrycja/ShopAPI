import React, { Component } from 'react';
import { variables } from './Variables.js';

export class CompanyCar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Cars: [],
            modalTitle: "",
            CarId: 0,
            Brand: "",
            Model: "",
            PhotoFileName: "",
            PhotoPath: variables.PHOTOS
        }
    }

    refresh() {

        fetch(variables.API_URL + 'CompanyCar')
            .then(response => response.json())
            .then(data => {
                this.setState({ Cars: data });
            });
    }

    componentDidMount() {
        this.refresh();
    }
    changeBrand = (e) => {
        this.setState({ Brand: e.target.value });
    }

    changeModel = (e) => {
        this.setState({ Model: e.target.value });
    }


    addClick() {
        this.setState({
            modalTitle: "Add Car",
            CarId: 0,
            Brand: "",
            Model: "",
            City: "",
            PhotoFileName: ""
        });
    }
    editClick(Car) {
        this.setState({
            modalTitle: "Edit Car",
            CarId: Car.CarId,
            Brand: Car.Brand,
            Model: Car.Model,
            PhotoFileName: Car.PhotoFileName
        });
    }

    createClick() {
        fetch(variables.API_URL + 'CompanyCar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Brand: this.state.Brand,
                Model: this.state.Model,
                PhotoFileName: this.state.PhotoFileName
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
        fetch(variables.API_URL + 'CompanyCar', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CarId: this.state.CarId,
                Brand: this.state.Brand,
                Model: this.state.Model,
                PhotoFileName: this.state.PhotoFileName
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
        fetch(variables.API_URL + 'CompanyCar/' + id, {
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

    imageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL + 'companycar/savefile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ PhotoFileName: data });
            })
    }

    render() {
        var {
            Cars,
            modalTitle,
            CarId,
            Brand,
            Model,
            PhotoFileName,
            PhotoPath
        } = this.state;

        return (
            <div style={{ backgroundColor: "#666666" }}>
                <button type="button"
                    className="btn add-button" style={{ marginLeft: "5px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Car
                </button>
                <table className="table data-table">
                    <thead>
                        <tr>
                        <th>
                                Car Id
                            </th>
                            <th>
                                Brand
                            </th>
                            <th>
                                Model
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Cars.map(Car =>
                            <tr key={Car.CarId}>
                                <td>{Car.CarId}</td><td>{Car.Brand}</td><td>{Car.Model}</td>
                                <td>
                                    <button type="button"
                                        className="btn edit-button" style={{ marginRight: '5px' }} data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(Car)}>
                                        Edit</button>
                                    <button type="button" style={{ marginRight: '5px' }}
                                        className="btn delete-button"
                                        onClick={() => this.deleteClick(Car.CarId)}>
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
                                        <span className="input-group-text">Car Brand</span>
                                        <input type="text" className="form-control"
                                            value={Brand}
                                            onChange={this.changeBrand} />
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Car Model</span>
                                        <input type="text" className="form-control"
                                            value={Model}
                                            onChange={this.changeModel} />
                                    </div>


                                </div>
                                <div className="p-2 w-50 bd-highlight">
                                    <img width="300px" height="300px"
                                        src={PhotoPath + PhotoFileName} />
                                    <input className="m-2" type="file" onChange={this.imageUpload} />
                                </div>


                            </div>
                            {CarId == 0 ?
                                <button type="button"
                                className="btn confirm-button"
                                    onClick={() => this.createClick()}
                                >Create</button>
                                : null}

                            {CarId != 0 ?
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