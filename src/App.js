import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import clo from "./assets/cloudLg.png";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      {/* <a href="https://gdsc.community.dev/dr-ambedkar-institute-of-technology-for-handicapped-kanpur-india/">
        <img src={img} alt="adypu_logo" className="d-inline-block align-text-top"></img>

      </a> */}
    </div>
  </nav>
);

const Footer = () => (
  <footer className="text-center text-white" style={{ backgroundColor: '#f1f1f1' }}>
    <div className="container pt-2">
      <section className="mb-4">
        <a href="https://www.instagram.com/utkarsh_katiyar_1/" target="_blank" className="btn btn-lg text-dark m-1" role="button" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/utkarshkatiyar1/" target="_blank" className="btn btn-lg text-dark m-1" role="button" rel="noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/utkarshkatiyar1/" target="_blank" className="btn btn-lg text-dark m-1" role="button" rel="noreferrer">
          <i className="fab fa-github"></i>
        </a>
      </section>
    </div>
    <div className="text-center text-dark p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      Developed by <a className="text-dark" href="https://github.com/utkarshkatiyar1/" target="_blank" rel="noreferrer">Utkarsh Katiyar</a>
    </div>
  </footer>
);

const compare = (a, b) => {
  if (a["# of Courses Completed"] > b["# of Courses Completed"]) {
    return -1;
  } else if (a["# of Courses Completed"] < b["# of Courses Completed"]) {
    return 1;
  } else {
    if (a["# of Skill Badges Completed"] > b["# of Skill Badges Completed"]) {
      return -1;
    } else if (a["# of Skill Badges Completed"] < b["# of Skill Badges Completed"]) {
      return 1;
    } else {
      if (a["# of GenAI Game Completed"] > b["# of GenAI Game Completed"]) {
        return -1;
      } else if (a["# of GenAI Game Completed"] < b["# of GenAI Game Completed"]) {
        return 1;
      } else {
        if (a["Total completion"] === "Yes" && b["Total completion"] === "No") {
          return -1;
        } else if (a["Total completion"] === "No" && b["Total completion"] === "Yes") {
          return 1;
        } else { if (a["Redemption Status"] === "Yes" && b["Redemption Status"] === "No") {
          return -1;
        } else if (a["Redemption Status"] === "No" && b["Redemption Status"] === "Yes") {
          return 1;
        }
        else return 0;
        }
      }
    }
  }
};

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('./data.json');
      const json = await result.json();
      setData(json);
    };
    fetchData();
  }, []);

  const updateData = async (filter) => {
    const result = await fetch('./data.json');
    let data = await result.json();
    if (filter !== '') {
      data = data.filter((el) =>
        el['Student Name'].toLowerCase().includes(filter.toLowerCase())
      );
    }
    data.sort(compare);
    setData(data);
  };

  useEffect(() => {
    updateData(filter);
  }, [filter]);

  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="container" style={{ paddingTop: '0px', paddingBottom: '40px', paddingLeft: '20px', marginTop: '150px' }}>
      <div className="gccp_data text-center my-5">
        <h4 style={{ fontWeight: 450 }}>
          <img src={clo} alt="adypu_logo" className="svrecpulg" />
          <span>Google </span>
          <b>
            <span className="study">Gen-AI </span>
            <span className="jams">Study </span>
            <span className="num23">JAMS</span>
            <span className="sym-"> '</span>
            <span className="num24">24</span>
          </b>
        </h4>
        <div className="custom-menu__right w-75 mx-auto">
          <i className="fa-solid fa-magnifying-glass icon"></i>
          <input
            className="p-2 w-100"
            type="text"
            value={filter}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <table className="table table-hover fa-border">
        <thead>
          <tr>
            <th scope="col"><b>Sr. No.</b></th>
            <th scope="col"><b>Name</b></th>
            <th scope="col"><b>Redemption Status</b></th>
            <th scope="col"><b>Pathway 1 Completed</b></th>
            <th scope="col"><b>Pathway 2 Completed</b></th>
            <th scope="col"><b>Arcade Completed</b></th>
            <th scope="col"><b>Total Completion</b></th>
          </tr>
        </thead>
        <tbody id="gccp_body">
          {data.map((d, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>
                <a
                  href={d['Google Cloud Skills Boost Profile URL']}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#000000' }}
                >
                  {d['Student Name']}
                </a>
              </td>
              <td>{d['Redemption Status'] === 'Yes' ? '✅' : '⚠️'}</td>
              <td>{d['# of Courses Completed'] === 1 ? '✅' : '⚠️'}</td>
              <td>{d['# of Skill Badges Completed'] === 1 ? '✅' : '⚠️'}</td>
              <td>{d['# of GenAI Game Completed'] === 1 ? '✅' : '⚠️'}</td>
              <td>{d['Total Completions of both Pathways'] === 'Yes' ? '✅' : '⚠️'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => (
  <div>
    <Navbar />
    <Leaderboard />
    <Footer />
  </div>
);

export default App;
