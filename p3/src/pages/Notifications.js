// Notification.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import '../styles/search.css'

const About = () => {
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const statusFilter = searchParams.get('filter');
        
        fetch(`http://127.0.0.1:8000/notifications?page=${currentPage}&status=${statusFilter || ''}`)
            .then(response => response.json())
            .then(data => {
                setNotifications(data.results);
                setTotalPages(data.total_pages);
            })
            .catch(error => console.error('Error fetching notifications:', error));
    }, [currentPage, location.search]);
    
    const handlePageChange = direction => {
        setCurrentPage(prevPage =>
            direction === 'next' ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1)
        );
    };

    return (
        <div>
            <div class="page_container">
                <div class="content_wrap">
                    <Header />
                    <main>
                        <div class="notifications-wrapper text-center">
                            <h1 class="display-4">Your Notifications</h1>
                            <div class="alerts-container">
                                {notifications.map(notification => (
                                    <div
                                    key={notification.id}
                                    className={`alert ${notification.type} notifications`}
                                    role="alert">
                                        {notification.message}
                                    </div>
                                ))}
                                <div class="alert alert-info notifications"  role="alert">
                                    Please add your email address to your account.
                                </div>
                                <div class="alert alert-info notifications"  role="alert">
                                    Please add your phone number to your account.
                                </div>
                                <div class="alert alert-success notifications" role="alert">
                                    Your adoption request has been processed successfully!
                                </div>
                                <div class="alert alert-success notifications" role="alert">
                                    Your profile picture has changed.
                                </div>
                            </div>
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
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default About;