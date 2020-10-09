import React from 'react';
import barImg from '../Components/barImg.png';
import './GraphBtn.css'


function graphBtnUpdate(){
    let graphBtn = document.getElementsByClassName("graphBtn")[0];
    
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 60) {
        graphBtn.style.bottom = "85px";
    }
    else{
        graphBtn.style.bottom = "25px";
    }
}

function GraphBtn() {
    let scroll = window.addEventListener("scroll", function(){
        graphBtnUpdate();
    });


    return (
        <div>
            <a className="graphBtn" href="https://charts.mongodb.com/charts-habitapp-txyxu/public/dashboards/5f7dffdc-f7c5-475e-859b-37cf0d57ff0a" target="_blank">
                <img className="graphIMG" src={barImg}/>
            </a>
        </div>
    )
}

export default GraphBtn
