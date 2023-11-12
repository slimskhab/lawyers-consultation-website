import React from 'react';
import "./HowItWorks.css"
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setContainerRef } from '../../../features/InPageNav';
function HowItWorks(props) {
    const containerRef = useRef(null);
    const scrollToId = useSelector((state) => state.pageNavStore.ref);
    const dispatch = useDispatch();
    useEffect(() => {
        if (scrollToId === 'howitworks' && containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
            dispatch(setContainerRef(null));
        }
    }, [scrollToId]);
    return (
        <div className='main-container' ref={containerRef}>
            <h1 className="title" >How It Works</h1>
            <p className='text-style'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className='howitworks-container'>
                <div className='images-container'>
                    <div className='image-placeholder' >
                    </div>
                    <div className='image-placeholder' style={{ marginLeft: "50%" }}>
                    </div>
                    <div className='image-placeholder' >
                    </div>

                </div>

                <div className='step-container'>
                    <div className='step-info-card'>
                        <div className='title-container'>
                            <span className='step-title' style={{ paddingRight: "40px" }}>01</span>
                            <span className='step-title'>First step</span>
                        </div>
                        <div className='text-container'>
                            <p className='step-text'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </p>
                        </div>
                    </div>
                    <div className='step-info-card'>
                        <div className='title-container'>
                            <span className='step-title' style={{ paddingRight: "40px" }}>02</span>
                            <span className='step-title'>Second step</span>
                        </div>
                        <div className='text-container'>
                            <p className='step-text'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </p>
                        </div>
                    </div>
                    <div className='step-info-card'>
                        <div className='title-container'>
                            <span className='step-title' style={{ paddingRight: "40px" }}>03</span>
                            <span className='step-title'>Third step</span>
                        </div>
                        <div className='text-container'>
                            <p className='step-text'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default HowItWorks;