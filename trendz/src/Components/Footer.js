import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import './Footer.css'

function displayCard(toggle, cardObj, footer) {
    if (!toggle) {
        cardObj.style.display = "block";
        footer.style.height = "25em";
        footer.style.overflow = "hidden";
    }
    else {
        cardObj.style.display = "none";
        footer.style.height = "2.2";
        footer.style.overflow = "";
    }
}

function Footer() {
    let footer = document.getElementsByClassName("footer")[0];
    // console.log("footer: ", footer);
    let aboutCard = document.getElementById("aboutCard");
    let privacyCard = document.getElementById("privacyCard");
    const [aboutToggle, setAboutToggle] = useState(false);
    const [privacyToggle, setPrivacyToggle] = useState(false);



    return (
        <div className="footer">
            <span id="aboutCard" className="card">
                <div className="cardTitle aboutTitle">
                    About Us
                </div>
                <div className="aboutDescription cardDescription">
                    MetaTrends is created by a student developer team from UCI. We have found difficulties keeping up with the latest trending data, often spending most of our days behind the screen. With MetaTrends, we can keep that time to a minimum! Happy scrolling!
                    <div>
                        Team members consist of Amar, Tim, Rishi, and  
                        <a className="linkedin" href="https://www.linkedin.com/in/sydneychiang/" target="_blank"> Sydney</a>
                        . Feel free to connect with us on LinkedIn!
                    </div>
                    
                </div>

            </span>
            <span id="privacyCard" className="card">
                <div className="cardTitle">
                    Privacy Policy
                </div>
                <div className="privacyDescription cardDescription">
                    MetaTrends will collect and use your personal information to continually update MetaTrends with features and functionalities that will benefit you. Please read our Terms of Service for more information.
                </div>
                <div>
                    <a className="tosButton" href="https://drive.google.com/file/d/1ZJEUGy6dj3nntqnp64K0RZHtRjpaYudY/view?usp=sharing" target="_blank">See Full Terms of Service</a>
                </div>

            </span>

            <span id="about" className="footerBtn" onClick={() => {
                if (privacyToggle) {
                    setPrivacyToggle(!privacyToggle);
                    displayCard(privacyToggle, privacyCard, footer);
                }
                setAboutToggle(!aboutToggle);
                displayCard(aboutToggle, aboutCard, footer);
            }}>
                About
            </span>
            <span id="privacy" className="footerBtn" onClick={() => {
                if (aboutToggle) {
                    setAboutToggle(!aboutToggle);
                    displayCard(aboutToggle, aboutCard, footer);
                }
                setPrivacyToggle(!privacyToggle);
                displayCard(privacyToggle, privacyCard, footer);
            }}>
                Privacy

            </span>
            <div>2020</div>
        </div>
    )
}

export default Footer
