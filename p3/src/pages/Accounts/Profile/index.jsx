// import header and footer (better to use layout but just stick with this for now)
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

// import the css file and other static files
import '../style.css'
import favicon from '../../../assets/favicon/favicon-32x32.png'

// import react-related stuff
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

// import other components
import { ajax } from '../../../ajax';