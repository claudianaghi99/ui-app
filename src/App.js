import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  API_URL = "http://localhost:5106/";

  componentDidMount() {
    this.refreshNotes();
  }
  async refreshNotes() {
    fetch(this.API_URL + "api/App/GetNotes")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ notes: data });
      });
  }

  async addClick() {
    var newNotes = document.getElementById("newNotes").value;
    var Phone = document.getElementById("Phone").value;

    var data = new FormData();
    data.append("newNotes", newNotes);
    data.append("Phone", Phone);

    fetch(this.API_URL + "api/App/AddNotes", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
  }

  async deleteClick(id) {
    fetch(this.API_URL + "api/App/DeleteNotes?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
  }

  async updateClick() {
    var newNotes = document.getElementById("newNotes2").value;
    var Phone = document.getElementById("Phone2").value;
    var id = document.getElementById("id").value;

    var data = new FormData();
    data.append("newNotes", newNotes);
    data.append("Phone", Phone);
    data.append("id", id);

    fetch(this.API_URL + "api/App/UpdateNotes", {
      method: "PUT",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
  }

  searchFunctionbyName() {
    const searchInput = document.getElementById("search");
    const rows = document.querySelectorAll("tbody tr");

    searchInput.addEventListener("keyup", function (event) {
      const q = event.target.value.toLowerCase();
      rows.forEach((row) => {
        row
          .querySelector("td:nth-child(2)")
          .textContent.toLowerCase()
          .startsWith(q)
          ? (row.style.display = "table-row")
          : (row.style.display = "none");
      });
    });
  }

  searchFunctionbyPhone() {
    const searchInput = document.getElementById("searchbyPhone");
    const rows = document.querySelectorAll("tbody tr");

    searchInput.addEventListener("keyup", function (event) {
      const q = event.target.value.toLowerCase();
      rows.forEach((row) => {
        row
          .querySelector("td:nth-child(3)")
          .textContent.toLowerCase()
          .startsWith(q)
          ? (row.style.display = "table-row")
          : (row.style.display = "none");
      });
    });
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="App">
        <div className="contents">
          <div className="left-part">
      
            <div className="employee-info">
              <div name="myForm" className="myForm">
                <h2>ADD</h2>

                Name: <input id="newNotes" />
                Phone: <input id="Phone" />

                <button onClick={() => this.addClick()}>Add</button>

                <h2>UPDATE</h2>

                Name: <input id="newNotes2" />
                Phone: <input id="Phone2" /> <br></br>
                Id: <input id="id" />

                <button onClick={() => this.updateClick()}>Update</button>
              </div>
            </div>
          </div>
        </div>


    <div className="right-part">

    <div className="filter-search">
          <label>Filter by name</label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            onFocus={this.searchFunctionbyName}
          />
        </div>

        <div className="filter-search">
          <label>Filter by phone</label>
          <input
            type="text"
            name="search"
            id="searchbyPhone"
            placeholder="Search..."
            onFocus={this.searchFunctionbyPhone}
          />
        </div>



        <div className="div-table">
          <table id="table">
            <thead>
              <tr className="table-first-line">
                <th className="first-name-cell">Id</th>
                <th className="last-name-cell">Name</th>
                <th className="email-cell">Phone</th>

                <th className="delete-cell">
                  <i className="fas fa-trash-alt"></i>
                </th>
              </tr>
            </thead>

            <tbody id="tbody">
              {notes.map((note) => (
                <tr>
                  <td>{note.id}</td>
                  <td id="name">{note.description}</td>
                  <td>{note.Phone}</td>
                  <td
                    className="btn btn-danger"
                    onClick={() => this.deleteClick(note.id)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      </div>
    );
  }
}
export default App;
