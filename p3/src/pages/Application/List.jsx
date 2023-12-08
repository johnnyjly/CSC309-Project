
// Import Basic Libraries
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ajax_or_login } from '../../ajax.js';
import { jwtDecode } from 'jwt-decode';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// Import Components
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

// Import CSS and Bootstrap
import '../../styles/applications.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AppList = () => {
  const [cardData, setCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('None');
  const [statusOption, setStatusOption] = useState('All');
  const location = useLocation();
  const PAGE_SIZE = 10;

  const [isShelter, setIsShelter] = useState(false);
  const authToken = localStorage.access;
  let decoded;
  useEffect(() => {
    try {
      decoded = jwtDecode(authToken);
      if (decoded.is_shelter === true) {
        setIsShelter(true);
      }
    } catch (e) {
      decoded = null;
    }
  }, [authToken, decoded]);

  useEffect(() => {
    ajax_or_login(`/applications/?page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        const newCardData = data.results.map((result) => ({
          id: result.ID,
          name: result.animal,
          shelter: result.shelter,
          applicant: result.applicant,
          status: result.status,
          last_created: result.creation_time,
        }));
        setCardData(newCardData);
        setTotalPages(Math.ceil(data.count / PAGE_SIZE));
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      })
  }, [currentPage]);

  const handlePageChange = direction => {
    setCurrentPage(prevPage =>
        direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1)
    );
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedData = [...cardData];
  
    switch (option) {
      case 'Pet':
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Shelter':
        sortedData.sort((a, b) => a.shelter.localeCompare(b.shelter));
        break;
      case 'Seeker':
        sortedData.sort((a, b) => a.applicant.localeCompare(b.applicant));
        break;
      case 'Last Created':
        sortedData.sort((a, b) => new Date(b.last_created) - new Date(a.last_created));
        break;
      default:
        // Default sorting, you can modify this based on your requirements
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  
    setCardData(sortedData);
  };

  const handleStatusChange = (option) => {
    setStatusOption(option);
    switch (option) {
      case 'Pending':
        option = 'pending';
        break;
      case 'Rejected':
          option = 'rejected';
          break;
      case 'Accepted':
        option = 'accepted';
        break;
      case 'Withdrawn':
          option = 'withdrawn';
          break;
      case 'All':
          option = '';
          break;
      default:
          option = '';
          break;
    }

    ajax_or_login(`/applications/?page=${currentPage}&status=${option}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Fetched data:', data);
      const newCardData = data.results.map((result) => ({
        id: result.ID,
        name: result.animal,
        shelter: result.shelter,
        applicant: result.applicant,
        status: result.status,
        last_created: result.last_created,
      }));
      setCardData(newCardData);
      setTotalPages(Math.ceil(data.count / PAGE_SIZE));
    })
    .catch((error) => {
      console.error('Error fetching applications:', error);
    })
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <div>
      <div class="page_container">
        <div class="content_wrap">
          <Header />
          <main>
            <div class="search-wrapper">
              {cardData.length > 0 ? (
                <h1 class="display-6 lead text-center mt-5">My Applications</h1>
              ) : (
                <h1 class="display-6 lead text-center mt-5">You have no Applications</h1>
              )}
              {/* <div class="input-group mt-5 px-5">
                <input type="search" class="form-control rounded" placeholder="Search for keywords" aria-label="Search" aria-describedby="search-addon" />
                <div class="btn-group">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Search By
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Name</a></li>
                    <li><a class="dropdown-item" href="#">Age</a></li>
                    <li><a class="dropdown-item" href="#">Breed</a></li>
                    <li><a class="dropdown-item" href="#">Colour</a></li>
                    <li><a class="dropdown-item" href="#">Gender</a></li>
                    <li><a class="dropdown-item" href="#">Location</a></li>
                    <li><a class="dropdown-item" href="#">Size</a></li>
                  </ul>
                </div>
                <button type="button" class="btn btn-outline-primary p-3">Search</button>
              </div> */}

              <div class="sort-wrapper text-end">
                <DropdownButton className="ddbtn" as={ButtonGroup} id="dropdown-basic-button" title={"Sort by: "+sortOption}>
                  <Dropdown.Item onClick={() => {
                    handleSortChange('Pet');
                  }}>Pet</Dropdown.Item>
                  {!isShelter && (
                    <Dropdown.Item onClick={() => {
                      handleSortChange('Shelter');
                    }}>Shelter</Dropdown.Item>
                  )}
                  {isShelter && (
                    <Dropdown.Item onClick={() => {
                      handleSortChange('Seeker');
                    }}>Seeker</Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={() => {
                    handleSortChange('Last Created');
                  }}>Last Created</Dropdown.Item>
                </DropdownButton>
                <DropdownButton className="ddbtn2" as={ButtonGroup} id="dropdown-basic-button" title={"Status: "+statusOption}>
                  <Dropdown.Item onClick={() => {
                    handleStatusChange('Pending');
                  }}>Pending</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    handleStatusChange('Rejected');
                  }}>Rejected</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    handleStatusChange('Accepted');
                  }}>Accepted</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    handleStatusChange('Withdrawn');
                  }}>Withdrawn</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    handleStatusChange('All');
                  }}>All</Dropdown.Item>
                </DropdownButton>
                <div className="card-container row row-cols-1 row-cols-md-3 g-4">
                  {cardData.map((card) => (
                    <div key={card.id} className="col">
                      <div className="card">
                        <div className="card-body">
                          <div className="title-subtitle-container">
                            <h5 className="card-title">{capitalizeFirstLetter(card.name)}</h5>
                            {isShelter && (
                              <h5 className="card-subtitle">{capitalizeFirstLetter(card.applicant)}</h5>
                            )}
                            {!isShelter && (
                              <h5 className="card-subtitle">{capitalizeFirstLetter(card.shelter)}</h5>
                            )}
                          </div>
                          <p className="card-text">Status: {capitalizeFirstLetter(card.status)}</p>
                        </div>
                        <div className="card-footer">
                          <Link type="button" class="btn btn-success" to={`/applications/${card.id}`}>
                              Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {cardData.length > 0 && (
                  <div className="pagination-container">
                    <button type="button" class="btn btn-primary"
                        onClick={() => handlePageChange('previous')} 
                        disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>{`Page: ${currentPage} of ${totalPages}`}</span>
                    <button type="button" class="btn btn-primary"
                        onClick={() => handlePageChange('next')}
                        disabled={currentPage === totalPages}>
                        Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppList;