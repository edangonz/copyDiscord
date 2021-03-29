import React from 'react';
import { Spring } from 'react-spring/renderprops'

export default function Visorimage(props) {
    return (
        <div className="full-container" onClick={() => {props.closeImage(undefined)}}>
            <Spring
                from={{ opacity: 0, transform: 'scale(0.6)' }}
                to={{ opacity: 1, transform: 'scale(1)' }}
                >
                {style =>
                    <img className="container-full-image"
                        style={style}    
                        src={props.url_image} alt="no hay imagen"
                        onClick={(e) => e.preventDefault()}/>
                }
            </Spring>
        </div>
    );
}