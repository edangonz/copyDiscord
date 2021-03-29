import React, { useState }  from 'react'
import {useTransition, animated} from 'react-spring'
import './Wait.css'

import { Spring } from 'react-spring/renderprops'

export default function Wait () {
    const [show_wait, setshow_wait] = useState(true);
    setTimeout(() => setshow_wait(false), 1750);
    
    const transitions = useTransition(show_wait, null, {
        from: { opacity: 1, width: '0px' },
        enter: { opacity: 1, width: window.innerWidth + 'px' },
        leave: { opacity: 0},
    })

    return (
    <>
        {transitions.map(({ item, key, props }) =>
            item && <animated.div key={key} style={props} className="wait-container full-container">
                <Spring
                    from={{ opacity: 0}}
                    to={{ opacity: 1}}>
                    {props =>
                        (
                            <div style={props} className="wait">
                                <div className="wait__logo"></div>
                                <p className="wait__text">Espere</p>
                            </div>
                        )
                    }
                </Spring>
            </animated.div>
        )}
    </>
    )
}
