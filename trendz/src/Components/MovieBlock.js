import React from 'react'
import './Component.css'
import Divider from '@material-ui/core/Divider';
import mulan from './mulan.jpeg'


function MovieBlock() {
    return (
        <div class="Block">
            <img src={mulan} alt="" class="posterPhoto"/>

            <span className="mediaType">Movie</span>
            <span className="trendingNum">#7 Trending</span>

            <span className="blockTitle">Mulan</span>
            <span className="description">When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.</span>





            <Divider variant="middle" style={{marginBottom: '15px'}} />
        </div>
    )
}

export default MovieBlock
