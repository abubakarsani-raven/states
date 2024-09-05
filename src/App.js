import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [count, setCOUNT] = useState(0);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);


    const handleClick = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const user = await response.json();
            setSelectedUser(user);
        } catch (e) {

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const userArray = await response.json();
                setUsers(userArray);
            } catch (e) {
                console.log(`Error message : ${e.message}`);
            }

        }
        fetchData();
    }, []);


    useEffect(() => {
        console.log(selectedUser)
    }, [selectedUser]);

    return (
        <div className="App">
            <p>My count is: {count}</p>
            <div>
                <button onClick={() => setCOUNT(count + 1)}>plus</button>
                <button onClick={() => setCOUNT(count - 1)}>minus</button>
            </div>
            <h1>List of Users </h1>
            <ul>
                {
                    users.map((item, index) => {
                        return <li key={`id-${item.id}`} onClick={() => handleClick(item.id)}>{item.name}</li>
                    })
                }
            </ul>
            <hr/>
            <h4>Selected User </h4>
            {selectedUser ? (
                <>
                    <p>Name :{selectedUser.name}</p>
                    <p>Phone Number : {selectedUser.phone}</p>
                </>
            ) : <div>No user selected</div>
            }
        </div>
    );
}

export default App;
