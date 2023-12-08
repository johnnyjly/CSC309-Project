// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// import header and footer (better to use layout but just stick with this for now)
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

// import the css file and other static files
import './style.css'



return <>
        <div className="page_container">
            <div className="content_wrap">
                <Header />
                    <main>

                    </main>
                <Footer />
            </div>
        </div>
    </>