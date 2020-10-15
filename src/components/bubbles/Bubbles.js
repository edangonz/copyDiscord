import React, { Component } from 'react'
import './Bubbles.css'

export default class Bubbles extends Component {
    constructor(){
        super();
        this.list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => ({
            size: (Math.floor(Math.random() * 6) + 4)+'px',
            left: (c * 9 + Math.floor(Math.random() * 10) + 5) + '%',
            second: (17) + Math.floor(Math.random() * 5),
            delay: 1 + Math.floor(Math.random() * 15)+'s',
        }));
    }
    
    render(){
        return (
            <div>
                {this.list.map((c, index) =>
                    <div
                        key={index}
                        style={{
                            width: c.size,
                            height: c.size,
                            left: c.left,
                            animation: `moveIcon ${c.second}s infinite linear`,
                            animationDelay: c.delay
                        }}
                        className="circle"></div>
                )}   
            </div>
    );}
}
