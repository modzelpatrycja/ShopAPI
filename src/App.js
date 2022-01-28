import logo from './logo.svg';
import './App.css';
import { Employee } from './Employee';
import { Client } from './Client';
import {Product} from './Product';
import { Order } from './Order';
import {CompanyCar} from './CompanyCar';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <Navbar.Brand style={{ marginLeft: "12px" }}>
          Store Service
        </Navbar.Brand >
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn nav-button" to="/employee">
              Employees
            </NavLink>
          </li>
          
          <li className="nav-item- m-1">
            <NavLink className="btn nav-button" to="/companycars">
              Company Cars
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn nav-button" to="/product">
              Products
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn nav-button" to="/client">
              Clients
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn nav-button" to="/order">
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/employee' component={Employee} />
        <Route path='/client' component={Client} />
        <Route path='/product' component={Product} />
        <Route path='/companycars' component={CompanyCar} />
        <Route path='/order' component={Order} />



      </Switch>
    </BrowserRouter>
  );
}

export default App;
