import React from 'react';
import './AdminView.css';

const list = [];

/*export default function AdminView() {
    function handleSubmit(event) {
        alert('Podano następujące imię: ' + this.state.value);
        event.preventDefault();
        //list.push(name)
    }
    return (<ul>
        {list.map(item => {
            return <li key={item}>{item}</li>;
        })}
        <form>
            <label>
                Imię:
                <input type="text" name="name" onChange={handleSubmit}/>
            </label>
            <input type="submit" value="Dodaj"/>
        </form>
    </ul>)

}*/

class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    /*handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        //alert('Podano następujące imię: ' + this.state.value);
        list.push(this.state.value)
        event.preventDefault();
    }*/

    routeChange() {
        let path = `/admin/createTest`;
        this.props.history.push({
            pathname: path,
            data: list // your data array of objects
        });
    }

    //tutaj moze po prostu nie byc formularza tylko sam guzik do przejscia do tworzenia testu
    render() {
        return (
            <ul>
                Dostępne testy :
                {list.map(item => {
                    return <li key={item}>{item}</li>;
                })}
                <button onClick={this.routeChange}>Stwórz test</button>
            </ul>
        );
    }
}

export default AdminView;


/*const allUsers = ['TEST1','TEST2','TEST3'];

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


const UsersList = ({ users }) => {
    if (users.length > 0) {
        return (
            React.createElement("ul", null,
                users.map(user => React.createElement("li", { key: user }, user))));


    }

    return (
        React.createElement("p", null, "No results!"));

};

export default AdminView;*/