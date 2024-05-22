import React from 'react';
import './footer.css'
import AboutUs from "./AboutUs";
import NavigationFooter from "./NavigationFooter";
import Contacts from "./Contacts";



export default function Footer() {
    return (
        <footer className="footer">
            <address>
                <AboutUs/>
                <NavigationFooter/>
                <Contacts/>

            </address>

        </footer>
    )
}
