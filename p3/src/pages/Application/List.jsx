
// Import Basic Libraries
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ajax_or_login } from '../../ajax.js';

// Import Components
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

// Import CSS and Bootstrap
import '../../styles/search.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AppList = () => {
  const [cardData, setCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('name');
  const location = useLocation();
  const PAGE_SIZE = 10;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const statusFilter = searchParams.get('filter');
    const sortFilter = searchParams.get('sort');
    
    ajax_or_login(`/applications/?page=${currentPage}&status=${statusFilter || ''}&sort=${sortFilter || ''}`, {
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
          description: result.status,
        }));
        setCardData(newCardData);
        setTotalPages(Math.ceil(data.count / PAGE_SIZE));
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      })
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
              {cardData.length > 0 ? (
                <h1 class="display-6 lead text-center mt-5">My Applications</h1>
              ) : (
                <h1 class="display-6 lead text-center mt-5">You have no Applications</h1>
              )}
              <div class="input-group mt-5 px-5">
                <input type="search" class="form-control rounded" placeholder="Search for keywords" aria-label="Search" aria-describedby="search-addon" />
                <div class="btn-group">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Search By
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Search All</a></li>
                    <li><a class="dropdown-item" href="#">Age</a></li>
                    <li><a class="dropdown-item" href="#">Breed</a></li>
                    <li><a class="dropdown-item" href="#">Colour</a></li>
                    <li><a class="dropdown-item" href="#">Gender</a></li>
                    <li><a class="dropdown-item" href="#">Location</a></li>
                    <li><a class="dropdown-item" href="#">Size</a></li>
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
                <div className="card-container row row-cols-1 row-cols-md-3 g-4">
                  {cardData.map((card) => (
                    <div key={card.id} className="col">
                      <div className="card">
                        <div className="card-body">
                          <div className="title-subtitle-container">
                            <h5 className="card-title">{capitalizeFirstLetter(card.name)}</h5>
                            <h5 className="card-subtitle">{capitalizeFirstLetter(card.shelter)}</h5>
                          </div>
                          <p className="card-text">Status: {capitalizeFirstLetter(card.description)}</p>
                        </div>
                        <div className="card-footer">
                          <button type="button" class="btn btn-success">
                              Details
                          </button>
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