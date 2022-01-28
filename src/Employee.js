import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Employees: [],
            cars: [],
            modalTitle: "",
            EmployeeId: 0,
            EmployeeName: "",
            EmployeeLastName: "",
            CarId: "",
        }
    }

    refresh() {

        fetch(variables.API_URL + 'Employee')
            .then(response => response.json())
            .then(data => {
                this.setState({ Employees: data });
            });
            fetch(variables.API_URL+'companycar')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cars:data});
        });
    }

    componentDidMount() {
        this.refresh();
    }
    changeEmployeeName = (e) => {
        this.setState({ EmployeeName: e.target.value });
    }

    changeEmployeeLastName = (e) => {
        this.setState({ EmployeeLastName: e.target.value });
    }

    changeCarId = (e) => {
        this.setState({ CarId: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Employee",
            EmployeeId: 0,
            EmployeeName: "",
            EmployeeLastName: "",
            CarId: "",
        });
    }
    editClick(Employee) {
        this.setState({
            modalTitle: "Edit Employee",
            EmployeeId: Employee.EmployeeId,
            EmployeeName: Employee.EmployeeName,
            EmployeeLastName: Employee.EmployeeLastName,
            CarId: Employee.CarId,
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Employee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeName: this.state.EmployeeName,
                EmployeeLastName: this.state.EmployeeLastName,
                CarId: this.state.CarId,
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
        fetch(variables.API_URL + 'Employee', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: this.state.EmployeeId,
                EmployeeName: this.state.EmployeeName,
                EmployeeLastName: this.state.EmployeeLastName,
                CarId: this.state.CarId,
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
            fetch(variables.API_URL + 'Employee/' + id, {
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
            Employees,
            cars,
            modalTitle,
            EmployeeId,
            EmployeeName,
            EmployeeLastName,
            CarId,
        } = this.state;

        return (
            <div style={{ backgroundColor: "#666666" }}>
                <button type="button"
                    className="btn add-button" style={{marginLeft: "5px"}}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                        Add Employee
                </button>
                <table className="table data-table">
                    <thead>
                        <tr>
                            <th>
                                Employee
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                CarId
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Employees.map(Employee =>
                            <tr key={Employee.EmployeeId}>
                                <td>{Employee.EmployeeName}</td><td>{Employee.EmployeeLastName}</td>
                                <td>{Employee.CarId}</td>
                                <td>
                                    <button type="button"
                                        className="btn edit-button" style={{ marginRight: '5px' }} data-bs-toggle="modal"   data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(Employee)}>
                                        Edit</button>
                                    <button type="button" style={{marginRight: '5px' }}
                                        className="btn delete-button"
                                        onClick={() => this.deleteClick(Employee.EmployeeId)}>
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
                                                value={EmployeeName}
                                                onChange={this.changeEmployeeName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Last Name</span>
                                            <input type="text" className="form-control"
                                                value={EmployeeLastName}
                                                onChange={this.changeEmployeeLastName} />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Car Id</span>
                                            <input type="text" className="form-control"
                                                value={CarId}
                                                onChange={this.changeCarId} />
                                        </div>


                                    </div>
                                </div>
                                {EmployeeId == 0 ?
                                    <button type="button"
                                        className="btn confirm-button"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {EmployeeId != 0 ?
                                    <button type="button confirm-button"
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