// Notification.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import '../styles/applications.css'

import { ajax_or_login } from '../ajax';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
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
      const searchParams = new URLSearchParams(location.search);
      
      ajax_or_login(`/notifications/?page=${currentPage}`, {
              method: 'GET',
              headers: {
              'Content-Type': 'application/json',
              },
              credentials: 'include',
          })
          .then(response => response.json())
          .then(data => {
              console.log('Fetched data:', data);
              setNotifications(data.results);
              setTotalPages(Math.ceil(data.count / PAGE_SIZE));
          })
          .catch(error => console.error('Error fetching notifications:', error));
  }, [currentPage, location.search]);
  
  const handlePageChange = direction => {
      setCurrentPage(prevPage =>
          direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1)
      );
  };

  function handleUrl(notification) {
    ajax_or_login(`/notifications/${notification.id}/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'is_read': 'true'
      }),
    }, navigate)
    .then((response) => response.json())
    .then(data => {
        navigate(notification.url)
    })
    .catch((error) => {
      console.error('Error fetching applications:', error);
    })
  }

  function handleDelete(notification) {
    ajax_or_login(`/notifications/${notification.id}/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    }, navigate)
    .then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to delete notification:', response.status);
      }
    })
    .catch((error) => {
      console.error('Error deleting notification:', error);
    });
  }

  return (
    <div>
        <div class="page_container">
            <div class="content_wrap">
                <Header />
                <main>
                    <div class="notifications-wrapper text-center">
                        {notifications.length > 0 ? (
                          <h1 class="display-4">Your Notifications</h1>
                        ) : (
                          <h1 class="display-4">You have no notifications!</h1>
                        )}
                        <div class="alerts-container">
                            {notifications.map(notification => (
                                <div
                                key={notification.id}
                                className={`alert ${
                                  notification.is_read ? "alert-secondary" : "alert-info"
                                } notifications d-flex justify-content-between align-items-center`}
                                role="alert">
                                  <div onClick={() => handleUrl(notification)} class="notification-text">
                                    {notification.message}
                                  </div>
                                <a 
                                  className="xbtn" 
                                  type="button" 
                                  class="btn btn-danger font-weight-bold"
                                  onClick={() => handleDelete(notification)}
                                >
                                  X
                                </a>
                                </div>
                            ))}
                        </div>
                        {notifications.length > 0 && (
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
                </main>
                <Footer />
            </div>
        </div>
    </div>
  );
};

export default Notifications;