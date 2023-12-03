// About.js
import React from 'react';

import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import '../styles/search.css'

const About = () => {
  return (
    <div>
        <div class="page_container">
            <div class="content_wrap">
                <Header />
                <main>
                    <div class="notifications-wrapper text-center">
                        <h1 class="display-4">Your Notifications</h1>
                        <div class="alerts-container">
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
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    </div>
  );
};

export default About;