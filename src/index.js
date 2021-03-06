import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/Home/HomePage';
import CatalogPage from './Components/Seed/Catalog/CatalogPage';
import AboutPage from './Components/About/AboutPage';
import ContactsPage from './Components/Contacts/ContactsPage';
import RegisterPage from './Components/Register/RegisterPage';
import LoginPage from './Components/Login/LoginPage';
import CreatePage from './Components/Seed/Create/CreatePage';
import EditPage from './Components/Seed/Edit/EditPage';
import DeletePage from './Components/Seed/Delete/DeletePage';
import DetailsPage from './Components/Seed/Details/DetailsPage';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />
            <Route path="catalog" component={CatalogPage} />
            <Route path="create" component={CreatePage} />
            <Route path="edit/:seedId" component={EditPage} />
            <Route path="delete/:seedId" component={DeletePage} />
            <Route path="details/:seedId" component={DetailsPage} />
            <Route path="about" component={AboutPage} />
            <Route path="contacts" component={ContactsPage} />
            <Route path="register" component={RegisterPage} />
            <Route path="login" component={LoginPage} />
            <Route path="logout" component={HomePage} />
        </Route> 
    </Router>,
    document.getElementById('root')
);
