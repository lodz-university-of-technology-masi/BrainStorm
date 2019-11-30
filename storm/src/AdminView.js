import React from 'react';
import logo from './logo.svg';
import './AdminView.css';

const allUsers = ['TEST1','TEST2','TEST3'];

class AdminView extends React.Component {
    constructor() {
        super();

        this.state = {
            filteredUsers: allUsers };

    }

    filterUsers(e) {
        const text = e.currentTarget.value;
        const filteredUsers = this.getFilteredUsersForText(text);
        this.setState({
            filteredUsers });

    }

    getFilteredUsersForText(text) {
        return allUsers.filter(user => user.toLowerCase().includes(text.toLowerCase()));
    }

    render() {
        return (
            React.createElement("div", null,
                React.createElement("input", { onInput: this.filterUsers.bind(this) }),
                React.createElement(UsersList, { users: this.state.filteredUsers })));


    }}
;

const UsersList = ({ users }) => {
    if (users.length > 0) {
        return (
            React.createElement("ul", null,
                users.map(user => React.createElement("li", { key: user }, user))));


    }

    return (
        React.createElement("p", null, "No results!"));

};

export default AdminView;