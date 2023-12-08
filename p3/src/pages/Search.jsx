// PetListing page
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';


import Header from "../components/Header/Header.jsx";
import Footer from '../components/Footer/Footer.jsx';
import ErrorNotLoggedIn from './ErrorNotLoggedIn.js';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { jwtDecode } from 'jwt-decode';

import './search.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const PetListing = () => {
  const [cardData, setCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('Sort Options');
  const [statusOption, setStatusOption] = useState('Available');
  const [shelterOption, setShelterOption] = useState('All Shelters');
  const [shelters, setShelters] = useState([]);
  const [ageOption, setAgeOption] = useState('All Ages');
  const [ages, setAges] = useState([]);
  const [breedOption, setBreedOption] = useState('All Breeds');
  const [breeds, setBreeds] = useState([]);
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isShelter, setIsShelter] = useState(false);
  const [shelterName, setShelterName] = useState('');

  // TODO: add ajax_or_login() or support 404 page if not logged in
  const authToken = localStorage.access;

  let decoded;

  useEffect(() => {
    try {
      decoded = jwtDecode(authToken);
      setLoggedIn(true);
      if (decoded.is_shelter === true) {
        setIsShelter(true);
        setShelterName(decoded.username);
      }
      console.log(decoded.username);
      console.log(shelterName);

    } catch (e) {
      decoded = null;
      setLoggedIn(false);
    }
  }, [authToken, decoded]);




  useEffect(() => {
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
        const newCardData = data.results.map((result, i) => ({
          key: i + 1,
          id: result.id,
          age: result.age,
          color: result.color,
          gender: result.gender,
          name: result.name,
          shelter: result.shelter,
          shelter_id: result.shelter_id,
          description: result.description,
          status: result.status,
          size: result.size,
          breed: result.breed,
          image: result.image,
          date: result.publication_date,
        }));
        setCardData(newCardData);

        setTotalPages(Math.ceil(data.count / 10));
        const newShelters = data.results.map((result, i) => (result.shelter));
        const uniqueShelters = [...new Set(newShelters)];
        setShelters(uniqueShelters);

        const newBreeds = data.results.map((result, i) => (result.breed));
        const uniqueBreeds = [...new Set(newBreeds)];
        uniqueBreeds.sort();
        setBreeds(uniqueBreeds);

        const newAges = data.results.map((result, i) => Number(result.age));
        const uniqueAges = [...new Set(newAges)];
        uniqueAges.sort(function (a, b) { return a - b });
        setAges(uniqueAges);
      })
      .catch((error) => console.error('Error fetching applications:', error));
  }, [currentPage, location.search, authToken]);

  const handlePageChange = direction => {
    setCurrentPage(prevPage =>
      direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1)
    );
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    switch (option) {
      case 'Age':
        option = 'age';
        break;
      case 'Last Updated':
        option = 'publication_date';
        break;
      default:
        option = 'publication_date';
        break;
    }

    fetch(`http://127.0.0.1:8000/petlistings/?sort=${option}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'pet/json',
        'Authorization': `Bearer ${authToken}`,
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        const newCardData = data.results.map((result, i) => ({
          key: i + 1,
          id: result.id,
          age: result.age,
          color: result.color,
          gender: result.gender,
          name: result.name,
          shelter: result.shelter,
          shelter_id: result.shelter_id,
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
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  return (
    loggedIn === false ? <ErrorNotLoggedIn /> :

      <div>
        <div className="page_container">
          <div className="content_wrap">
            <Header />
            <main>
              <h1 className="display-6 lead text-center mt-5">
                Currently, {cardData.length} pets are waiting!
              </h1>

              <div>
                {/* <input type="search" style={{maxHeight: 45}} className="form-control rounded" placeholder="Search for keywords" aria-label="Search" aria-describedby="search-addon"
                onChange={inputHandler} onKeyDown={e => handleKeyDown(e)} value={searchQuery}/> */}
                <div></div>

                <ButtonGroup justified style={{ display: 'flex', justifyContent: 'center', marginBottom: 15 }} >
                  <DropdownButton as={ButtonGroup} id="dropdown-basic-button" title={statusOption}>
                    <Dropdown.Item onClick={() => {
                      setStatusOption('Available');
                    }
                    }>Available</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      setStatusOption('Pending');
                    }
                    }>Pending</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      setStatusOption('Adopted');
                    }
                    }>Adopted</Dropdown.Item>
                  </DropdownButton>

                  <DropdownButton justified as={ButtonGroup} id="dropdown-basic-button" title={shelterOption}>
                    <Dropdown.Item onClick={() => {
                      setShelterOption('All Shelters');
                    }
                    }>All Shelters</Dropdown.Item>
                    {shelters.map((shelter) => (
                      <Dropdown.Item onClick={() => {
                        setShelterOption(capitalizeFirstLetter(shelter));
                      }
                      }>{capitalizeFirstLetter(shelter)}</Dropdown.Item>
                    ))}

                  </DropdownButton>

                  <DropdownButton justified as={ButtonGroup} id="dropdown-basic-button" title={ageOption}>
                    <Dropdown.Item onClick={() => {
                      setAgeOption('All Ages');
                    }
                    }>All Ages</Dropdown.Item>
                    {ages.map((ages) => (
                      <Dropdown.Item onClick={() => {
                        setAgeOption(ages);
                      }
                      }>{ages}</Dropdown.Item>
                    ))}

                  </DropdownButton>

                  <DropdownButton as={ButtonGroup} id="dropdown-basic-button" title={capitalizeFirstLetter(breedOption)}>
                    <Dropdown.Item onClick={() => {
                      setBreedOption('All Breeds');
                    }
                    }>All Breeds</Dropdown.Item>
                    {breeds.map((breed) => (
                      <Dropdown.Item onClick={() => {
                        setBreedOption(breed);
                      }
                      }>{capitalizeFirstLetter(breed)}</Dropdown.Item>
                    ))}

                  </DropdownButton>



                  <DropdownButton as={ButtonGroup} id="dropdown-basic-button" title={sortOption}>
                    <Dropdown.Item onClick={() => {
                      handleSortChange('Age');
                    }}>Age</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      handleSortChange('Last Updated');
                    }}>Last Updated</Dropdown.Item>
                  </DropdownButton>


                  {isShelter ? <Link className='btn btn-primary' style={{ marginTop: 30, maxWidth: 160 }} role='button' to='/newpet'>
                    + Add a new pet
                  </Link> : ''}



                </ButtonGroup>


















                <Row xs={1} md={3} className="g-2" style={{ padding: 30, marginTop: -30 }}>
                  {cardData.map((card) => (
                    <Col key={card.id}>
                      <Card key={card.id} >
                        <Card.Header>{capitalizeFirstLetter(card.status)} 
                        {card.shelter === shelterName ? <Link className='btn btn-primary' style={{ float: 'right',  fontSize: 14, padding: '2px 6px 2px 6px'}} role='button' to={`/editpet/${card.id}`} state={card}> Update </Link> : ''}
                        
                        </Card.Header>
                        
                        <Card.Img variant="top" src={card.image} style={{ height: 200, maxHeight: 200 }} />
                        <Card.Body>
                          <Card.Title>{capitalizeFirstLetter(card.name)}, {card.age} years old</Card.Title>
                          <Card.Text>
                            {card.description}
                          </Card.Text>
                          <Link className='btn btn-primary' to={`/listings/${card.id}`} state={card}>
                            Details 
                          </Link>
                          {/* <Button variant="outline-primary" href={`/listings/${card.id}`} >Details</Button> */}
                        </Card.Body>

                        <Card.Footer className="test-muted">
                          <small className="text-muted">Last updated {new Date(card.date).toLocaleDateString()}</small>

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
                  <button type="button" className="btn btn-primary"
                    onClick={() => handlePageChange('previous')}
                    disabled={currentPage === 1}>
                    Previous
                  </button>
                  <span>{`Page: ${currentPage} of ${totalPages}`}</span>
                  <button type="button" className="btn btn-primary"
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === totalPages}>
                    Next
                  </button>

                </div>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
  );
};

export default PetListing;