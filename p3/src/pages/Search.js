// PetListing page
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from "../components/Header/Header.jsx";
import Footer from '../components/Footer/Footer.jsx';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// import '../styles/search.css'
import '../styles/base.css'
import './search.css'

import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js'


const SeekerAppList = () => {
  const [cardData, setCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('name');
  const location = useLocation();


  // For now, use seeker1's token for testing
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxOTg0NTg1LCJpYXQiOjE3MDE4OTgxODUsImp0aSI6ImY5N2Q2NjczODk4NjQwZTg5OWVhMmNiOWQ5OGE0ZWExIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJzZWVrZXIxIiwiaXNfc2hlbHRlciI6ZmFsc2UsImlzX3NlZWtlciI6dHJ1ZX0.CX8_3J_RrsuIs8gF0KFtrR-6_d2-vQhv_c3SJLDEMNA';

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const statusFilter = searchParams.get('filter');
    const sortFilter = searchParams.get('sort');
    
    fetch(`http://127.0.0.1:8000/petlistings/?page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'pet/json',
          'Authorization': `Bearer ${authToken}`,
        },
        credentials: 'include',
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        // console.log('Username: ', );
        const newCardData = data.results.map((result) => ({
          key: result.ID,
          id: result.ID,
          age: result.age,
          color: result.color,
          gender: result.gender,
          name: result.name,
          shelter: result.shelter,
          description: result.description,
          status: result.status,
          size: result.size,
          breed: result.breed,
          image: result.image,
          date: result.publication_date,
        }));
        setCardData(newCardData);
        setTotalPages(Math.ceil(data.count / 10));
      })
      .catch((error) => console.error('Error fetching applications:', error));
  }, [currentPage, location.search, sortOption]);

  const handlePageChange = direction => {
    setCurrentPage(prevPage =>
        direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1)
    );
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };
  
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
              <h1 class="display-6 lead text-center mt-5">Currently, 0 pets are waiting!</h1>
              <div class="input-group mt-5 px-5">
                <input type="search" class="form-control rounded" placeholder="Search for keywords" aria-label="Search" aria-describedby="search-addon" />
                <div class="btn-group">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Search By
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="./search">Search All</a></li>
                    <li><a class="dropdown-item" href="./search?age">Age</a></li>
                    <li><a class="dropdown-item" href="./search?breed">Breed</a></li>
                    <li><a class="dropdown-item" href="./search?colour">Colour</a></li>
                    <li><a class="dropdown-item" href="./search?gender">Gender</a></li>
                    <li><a class="dropdown-item" href="./search?location">Location</a></li>
                    <li><a class="dropdown-item" href="./search?size">Size</a></li>
                  </ul>
                </div>
                <button type="button" class="btn btn-outline-primary p-3">Search</button>
              </div>

              <div class="sort-wrapper text-end">
                <div class=" sort-text"> Sort by
                  <div class="btn-group sort-btn-wrapper">
                    <button class="btn btn-primary dropdown-toggle sort-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Name (A-Z)
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" onClick={() => handleSortChange('name')}>Name (A-Z)</a></li>
                      <li><a class="dropdown-item" onClick={() => handleSortChange('age')}>Age (Old-Young)</a></li>
                      <li><a class="dropdown-item" onClick={() => handleSortChange('date')}>Date (Recent-Old)</a></li>
                    </ul>
                  </div>
                </div>
                
                  <Row xs={1} md={3} className="g-2" style={{ marginLeft: -50, padding: 20 }}>
                    {cardData.map((card) => (
                      <Col key={card.id}>
                        <Card key={card.id} >
                        <Card.Img variant="top" src={card.image} />
                        <Card.Body>
                          <Card.Title>{card.name}, {card.age} years old</Card.Title>
                          <Card.Text>
                            {card.description}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <small className="text-muted">Last updated { new Date(card.date).toLocaleDateString() }</small>
                        </Card.Footer>
                      </Card>
                      </Col>
                      
                      
                      
                      ))}
                  </Row>

                  
                  
                  {/* {cardData.map((card) => (
                    <div key={card.id} className="col">
                      <div key={card.id} className="card">
                        <div key={card.id} className="card-body">
                          <div key={card.id} className="title-subtitle-container test1">
                            <img class="small-img" src={card.image}></img>

                            
                            <h5 key={card.id} className="card-title">{capitalizeFirstLetter(card.name)}, {card.age}</h5>
                            
                            <h5 key={card.id} className="card-subtitle">{capitalizeFirstLetter(card.shelter)}</h5>
                          </div>
                          <p key={card.id} className="card-text">Status: {capitalizeFirstLetter(card.description)}</p>
                        </div>
                        <div key={card.id} className="card-footer">
                          <button key={card.id} type="button" class="btn btn-success">
                              Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))} */}
               
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
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SeekerAppList;