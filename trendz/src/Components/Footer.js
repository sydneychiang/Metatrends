import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import './Footer.css'


function displayCard(toggle, cardObj, footerOpen, setFooterOpen) {
    if (!toggle) {
        cardObj.style.display = "inline-block";

    }
    else if (toggle) {
        cardObj.style.display = "none";
    }
}



function Footer({ footerOpen, setFooterOpen}) {
    let aboutCard = document.getElementById("aboutCard");
    let privacyCard = document.getElementById("privacyCard");
    const [aboutToggle, setAboutToggle] = useState(false);
    const [privacyToggle, setPrivacyToggle] = useState(false);

    return (

        <div>
            <div>
                <div className="popupCard">
                    <span id="aboutCard" className="card slide-up">
                        <div id="aboutX" className="notrotate" onClick={() => {
                            if (privacyToggle) {
                                setPrivacyToggle(!privacyToggle);
                                displayCard(privacyToggle, privacyCard, footerOpen, setFooterOpen);
                            }
                            setAboutToggle(!aboutToggle);
                            displayCard(aboutToggle, aboutCard, footerOpen, setFooterOpen);

                        }}>
                            x
                    </div>
                        <div className="cardTitle aboutTitle">
                            About Us
                    </div>
                        <div className="aboutDescription cardDescription">
                            MetaTrends is created by a student developer team from UCI. We have found difficulties keeping up with the latest trending data, often spending most of our days behind the screen. With MetaTrends, we can keep that time to a minimum! Happy scrolling!
                        <div>
                                <br />
                                Team members consist of
                            <a className="linkedin" href="https://www.linkedin.com/in/amar-sharma-1994bb175/"><strong> Amar, </strong></a>
                                <a className="linkedin" href="https://www.linkedin.com/in/timothy-zhu/"><strong>Tim, </strong></a>
                                <a className="linkedin" href="https://www.linkedin.com/in/godugu-rishi/"><strong>Rishi, </strong></a>
                                and
                            <a className="linkedin" href="https://www.linkedin.com/in/sydneychiang/" target="_blank"><strong> Sydney</strong></a>
                                . Feel free to click on our names and connect with us on LinkedIn!
                        </div>

                        </div>

                    </span>
                    <span id="privacyCard" className="card slide-up">
                        <div id="privacyX" className="notrotate" onClick={() => {
                            if (aboutToggle) {
                                setAboutToggle(!aboutToggle);
                                displayCard(aboutToggle, aboutCard, footerOpen, setFooterOpen);
                            }
                            setPrivacyToggle(!privacyToggle);
                            displayCard(privacyToggle, privacyCard, footerOpen, setFooterOpen);
                        }}>
                            x
                    </div>
                        <div className="cardTitle">
                            Privacy Policy
                    </div>
                        <div className="privacyDescription cardDescription">
                            MetaTrends will collect and use your personal information to continually update MetaTrends with features and functionalities that will benefit you. Please read our Terms of Service for more information.
                    </div>
                        <div>
                            <a className="tosButton" href="https://drive.google.com/file/d/1ZJEUGy6dj3nntqnp64K0RZHtRjpaYudY/view?usp=sharing" target="_blank">See Policy</a>
                        </div>

                    </span>

                </div>
                <div className="footer footerAnimationUp">
                    <span id="about" className="footerBtn" onClick={() => {
                        if (privacyToggle) {
                            setPrivacyToggle(!privacyToggle);
                            displayCard(privacyToggle, privacyCard, footerOpen, setFooterOpen);
                        }
                        setAboutToggle(!aboutToggle);
                        displayCard(aboutToggle, aboutCard, footerOpen, setFooterOpen);
                    }}>
                        About
                </span>
                    <span id="privacy" className="footerBtn" onClick={() => {
                        if (aboutToggle) {
                            setAboutToggle(!aboutToggle);
                            displayCard(aboutToggle, aboutCard, footerOpen, setFooterOpen);
                        }
                        setPrivacyToggle(!privacyToggle);
                        displayCard(privacyToggle, privacyCard, footerOpen, setFooterOpen);
                    }}>
                        Privacy
    
                </span>
                    <div>2020</div>
                </div>
            </div>
        </div>
    )
}

export default Footer