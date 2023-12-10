// PetListing page
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import Header from "../../components/Header/Header.jsx";
import Footer from '../../components/Footer/Footer.jsx';
import ErrorNotLoggedIn from '../ErrorNotLoggedIn.js';
import { ajax } from '../../ajax.js';

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
  const [status, setStatus] = useState([]);
  const [shelterOption, setShelterOption] = useState('Choose a Shelter');
  const [shelters, setShelters] = useState([]);
  const [ageOption, setAgeOption] = useState('Choose an Age');
  const [ages, setAges] = useState([]);
  const [breedOption, setBreedOption] = useState('Choose a Breed');
  const [breeds, setBreeds] = useState([]);
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isShelter, setIsShelter] = useState(false);
  const [shelterName, setShelterName] = useState('');
  const [numPets, setNumPets] = useState(0);

  const navigate = useNavigate();

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

    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');

    let status = searchParams.get('status');
    let sort = searchParams.get('sort');
    let shelter = searchParams.get('shelter');
    let age = searchParams.get('age');
    let breed = searchParams.get('breed');



    if (page === null) {
      searchParams.set('page', 1);
    }

    // if (shelter !== null) {
    //   searchParams.set('shelter', shelter);
    // }

    let fetchURI;

    console.log(page)
    if (page < 1 ) {
      searchParams.set('page', 1);
    } 

    if (sort === null) {
      fetchURI = `/petlistings/?page=${currentPage}`;
    }
    else if (sort !== null) {
      setSortOption(sort);
      if (sort === 'Last Updated') {
        sort = 'publication_date';
      }
      fetchURI = `/petlistings/?page=${currentPage}&sort=${sort.toLowerCase()}`;
    }



    if (statusOption !== null) {
      searchParams.set('status', statusOption);
      fetchURI = fetchURI + `&status=${statusOption.toLowerCase()}`;
    }

    // if (shelterOption !== null && shelterOption === 'Choose a Shelter') {
    //   searchParams.set('shelter', shelterOption);
    //   fetchURI = fetchURI + `&shelter=${shelterOption.toLowerCase()}`;

    // }

    // console.log(shelter, shelterOption);

    if (shelterOption === 'Choose a Shelter' && shelter !== null) {
      searchParams.set('shelter', shelter);
      fetchURI = fetchURI + `&shelter=${shelter.toLowerCase()}`;
      setShelterOption(capitalizeFirstLetter(shelter));
    }
    else if (shelterOption !== 'Choose a Shelter') {
      if (shelterOption === 'All Shelters') {
        searchParams.delete('shelter');

      } else {
        searchParams.set('shelter', shelterOption);
        searchParams.set('page', currentPage);
        fetchURI = fetchURI + `&shelter=${shelterOption.toLowerCase()}`;
      }
    }

    if (ageOption === 'Choose an Age' && age !== null) {
      searchParams.set('age', age);
      fetchURI = fetchURI + `&age=${Number(ageOption)}`;
      setAgeOption(age);
    }
    else if (ageOption !== 'Choose an Age') {
      if (ageOption === 'All Ages') {
        searchParams.delete('age');

      } else {
        searchParams.set('age', ageOption);
        searchParams.set('page', 1);
        fetchURI = fetchURI + `&age=${Number(ageOption)}`;
      }
    }


    if (breedOption === 'Choose a Breed' && breed !== null) {
      searchParams.set('breed', breed);
      fetchURI = fetchURI + `&breed=${breed.toLowerCase()}`;
      setBreedOption(capitalizeFirstLetter(breed));
    }
    else if (breedOption !== 'Choose a Breed') {
      if (breedOption === 'All Breeds') {
        searchParams.delete('breed');

      } else {
        searchParams.set('breed', breedOption);
        searchParams.set('page', 1);
        fetchURI = fetchURI + `&breed=${breedOption.toLowerCase()}`;
      }
    }

    console.log(searchParams.toString());



    navigate(`/listings?${searchParams.toString()}`);
    setCurrentPage(Number(searchParams.get('page')));

    ajax(fetchURI, {
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
        setCardData(newCardData !== null ? newCardData : [{}]);

        setNumPets(data.count);

        setTotalPages(Math.ceil(data.count / 10));

        const newShelters = data.results.map((result, i) => {
          return result.shelter
        })

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

        const newStatus = data.results.map((result, i) => (result.status));
        const uniqueStatus = [...new Set(newStatus)];
        uniqueStatus.sort();
        setStatus(uniqueStatus);



      })
      .catch((error) => console.error('Error fetching applications:', error));
  }, [currentPage, location.search, authToken, sortOption, statusOption, navigate, totalPages, shelterOption, ageOption, breedOption]);

  const handlePageChange = (direction, sortOp) => {
    console.log("total: " + totalPages)
    setCurrentPage(prevPage =>
      direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1)
    );


    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', direction === 'next' ? Math.min(currentPage + 1, totalPages) : Math.max(currentPage - 1, 1));
    navigate(`/listings?${searchParams.toString()}`);

  };

  const handleShelterChange = (option, pageNum) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNum);
    searchParams.set('shelter', option);
    navigate(`/listings?${searchParams.toString()}`);
    setShelterOption(option);

    ajax(`/petlistings/?page=${currentPage}&shelter=${option}`, {
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


  }


  const handleSortChange = (option, pageNum) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNum);
    searchParams.set('sort', option);
    navigate(`/listings?${searchParams.toString()}`);
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

    ajax(`/petlistings/?page=${currentPage}&sort=${option}`, {
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
              {numPets === 0 ? <div>
                <h1 className="display-6 lead text-center mt-5">
                  No entries Found!
                  {isShelter ?
                    <p className="lead" style={{ marginTop: 50 }}>
                      Check the <a href="/listings?page=1&status=Available" style={{textDecoration: "none"}}>pet listing</a> page and add your own pets.
                    </p>
                    :
                    <p className="lead" style={{ marginTop: 50 }}>
                      Check the other <a href="/shelters" style={{textDecoration: "none"}}>shelters</a> or search the <a href="/listings" style={{textDecoration: "none"}}>pet listings</a>.
                    </p>
                  }
                </h1>


              </div> : <div>

                <h1 className="display-6 lead text-center mt-5">
                  Currently, {numPets} {numPets > 1 ? 'pets are' : 'pet is'} waiting!
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

                    <DropdownButton justified as={ButtonGroup} id="dropdown-basic-button" title={capitalizeFirstLetter(shelterOption)}>
                      <Dropdown.Item onClick={() => {
                        setShelterOption('All Shelters');
                      }
                      }>All Shelters</Dropdown.Item>
                      {shelters.map((shelter) => (
                        <Dropdown.Item onClick={() => {
                          setShelterOption(shelter);
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
                        handleSortChange('Age', currentPage);
                      }}>Age</Dropdown.Item>
                      <Dropdown.Item onClick={() => {
                        handleSortChange('Last Updated', currentPage);
                      }}>Last Updated</Dropdown.Item>
                    </DropdownButton>


                    {isShelter ? <Link className='btn btn-primary' style={{ marginTop: 30, maxWidth: 160 }} role='button' to='/newpet'>
                      + Add a new pet
                    </Link> : ''}



                  </ButtonGroup>



                  <Row xs={1} md={4} className="g-2" style={{ padding: 30, marginTop: -30 }}>
                    {cardData.map((card) => (
                      <Col key={card.id}>
                        <Card key={card.id} >
                          <Card.Header>{capitalizeFirstLetter(card.status)}
                            {card.shelter === shelterName ? <Link className='btn btn-primary' style={{ float: 'right', fontSize: 14, padding: '2px 6px 2px 6px' }} role='button' to={`/editpet/${card.id}`} state={card}> Update </Link> : ''}

                          </Card.Header>

                          <Card.Img variant="top" src={card.image} style={{ height: 200, maxHeight: 200 }} />
                          <Card.Body>
                            <Card.Title>{capitalizeFirstLetter(card.name)}, {card.age} years old</Card.Title>
                            <Card.Text style={{ minHeight: 300 }}>
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
                      onClick={() => handlePageChange('previous', sortOption)}
                      disabled={currentPage === 1}>

                      Previous
                    </button>
                    <span>{`Page: ${currentPage} of ${totalPages}`}</span>
                    <button type="button" className="btn btn-primary"
                      onClick={() => handlePageChange('next', sortOption)}
                      disabled={currentPage === totalPages}>
                      Next
                    </button>

                  </div>
                </div>
              </div>}
            </main>
            <Footer />
          </div>
        </div>
      </div>
  );
};

export default PetListing;