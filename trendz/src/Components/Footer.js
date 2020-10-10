import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import './Footer.css'


function displayCard(toggle, cardObj) {
    if (!toggle) {
        cardObj.style.display = "inline-block";
        document.body.style.overflow = "hidden";

    }
    else if (toggle) {
        cardObj.style.display = "none";
        document.body.style.overflow = "auto";
    }
}



function Footer() {
    let aboutCard = document.getElementById("aboutCard");
    let privacyCard = document.getElementById("privacyCard");
    let scoreCard = document.getElementById("scoreCard");
    const [aboutToggle, setAboutToggle] = useState(false);
    const [privacyToggle, setPrivacyToggle] = useState(false);
    const [scoreToggle, setScoreToggle] = useState(false);

    return (

        <div>
            <div>
                <div className="popupCard">
                <span id="scoreCard" className="card slide-up">
                    <span id="scoreX" className="notrotate" onClick={() => {
                        if (privacyToggle) {
                            setPrivacyToggle(!privacyToggle);
                            displayCard(privacyToggle, privacyCard);
                        }
                        if(aboutToggle){
                            setAboutToggle(!aboutToggle);
                            displayCard(aboutToggle, aboutCard);
                        }
                        setScoreToggle(!scoreToggle);
                        displayCard(scoreToggle, scoreCard);

                        }}>
                            x
                    </span>
                        <div className="cardTitle scoreTitle">
                            How is the Trend Score calculated?
                    </div>
                        <div className="scoreDescription cardDescription">
                            The Trend Score is calculated by normalizing the levels of activity common to each of the seven sites to allow platform-independent scoring and awards points for the rate that popularity increases relative to other popular content on that platform.
                            
                            <span className="icons">
                                <span className="icon">
                                    {'\u25b2'} Rising
                                </span>
                                <span className="icon">
                                    {'\u25bc'} Falling
                                </span>
                                <span className="icon">
                                    {'\u25cf'} New
                                </span>
                            </span>
                        </div>
                    </span>
                    <span id="aboutCard" className="card slide-up">
                        <span id="aboutX" className="notrotate" onClick={() => {
                            if (privacyToggle) {
                                setPrivacyToggle(!privacyToggle);
                                displayCard(privacyToggle, privacyCard);
                            }
                            if (scoreToggle){
                                setScoreToggle(!scoreToggle);
                                displayCard(scoreToggle, scoreCard);
                            }
                            setAboutToggle(!aboutToggle);
                            displayCard(aboutToggle, aboutCard);

                        }}>
                            x
                        </span>
                        <div className="cardTitle aboutTitle">
                            About Us
                    </div>
                        <div className="aboutDescription cardDescription">
                            MetaTrends is created by a student developer team from UCI. We have found difficulties keeping up with the latest trending data, often spending most of our days behind the screen. With MetaTrends, we can keep that time to a minimum! Happy scrolling!
                        <div>
                                <br />
                                Team members consist of
                            <a className="linkedin" href="https://www.linkedin.com/in/amar-sharma-1994bb175/" target="_blank"><strong> Amar, </strong></a>
                                <a className="linkedin" href="https://www.linkedin.com/in/timothy-zhu/" target="_blank"><strong>Tim, </strong></a>
                                <a className="linkedin" href="https://www.linkedin.com/in/godugu-rishi/" target="_blank"><strong>Rishi, </strong></a>
                                and
                            <a className="linkedin" href="https://www.linkedin.com/in/sydneychiang/" target="_blank"><strong> Sydney</strong></a>
                                . Feel free to click on our names and connect with us on LinkedIn!
                        </div>

                        </div>

                    </span>
                    <span id="privacyCard" className="card slide-up">
                        <span id="privacyX" className="notrotate" onClick={() => {
                            if (aboutToggle) {
                                setAboutToggle(!aboutToggle);
                                displayCard(aboutToggle, aboutCard);
                            }
                            if (scoreToggle){
                                setScoreToggle(!scoreToggle);
                                displayCard(scoreToggle, scoreCard);
                            }
                            setPrivacyToggle(!privacyToggle);
                            displayCard(privacyToggle, privacyCard);
                        }}>
                            x
                    </span>
                        <div className="cardTitle">
                        <a className="" href="https://drive.google.com/file/d/1ZJEUGy6dj3nntqnp64K0RZHtRjpaYudY/view?usp=sharing" target="_blank">Privacy Policy</a>
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
                            displayCard(privacyToggle, privacyCard);
                        }
                        if (scoreToggle){
                            setScoreToggle(!scoreToggle);
                            displayCard(scoreToggle, scoreCard);
                        }
                        setAboutToggle(!aboutToggle);
                        displayCard(aboutToggle, aboutCard);
                    }}>
                        About
                    </span>
                    <span id="score" className="footerBtn" onClick={() => {
                            if (privacyToggle) {
                                setPrivacyToggle(!privacyToggle);
                                displayCard(privacyToggle, privacyCard);
                            }
                            if (aboutToggle){
                                setAboutToggle();
                                displayCard(aboutToggle, aboutCard);
                            }
                            setScoreToggle(!scoreToggle);
                            displayCard(scoreToggle, scoreCard);
                        }}>
                            Trend Score Calculations
                    </span>
                    <span id="privacy" className="footerBtn" onClick={() => {
                        if (aboutToggle) {
                            setAboutToggle(!aboutToggle);
                            displayCard(aboutToggle, aboutCard);
                        }
                        if (scoreToggle){
                            setScoreToggle(!scoreToggle);
                            displayCard(scoreToggle, scoreCard);
                        }
                        setPrivacyToggle(!privacyToggle);
                        displayCard(privacyToggle, privacyCard);
                    }}>
                        Privacy
    
                </span>
                <span>
                    <a href="https://www.buymeacoffee.com/Metatrends" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{width: "200px"}}/></a>
                </span>
                    <div id="year">2020</div>
                </div>
            </div>
        </div>
        
    )
}

export default Footer