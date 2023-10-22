import React from 'react';
import Footer from "../../components/footer/Footer"
import SmallNavBar from '../../components/smallnavigationbar/SmallNavBar';
import "./Profile.css"
import Milestone from '../../components/milestone/Milestone';
function Profile(props) {
    var donation = "50";
    var firstMilestoneIsActive = false;
    var secondMilestoneIsActive = false;
    var thirdMilestoneIsActive = false;
    var forthMilestoneIsActive = false;

    function changeMilestone() {
        firstMilestoneIsActive = true;
    }
    changeMilestone();
    return (
        <div>

            <SmallNavBar />
            <div className='main-profile-container'>
                <div className='profile-images-container'>

                    <div style={{ width: 48 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M30 12L18 24L30 36" stroke="#001F3F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div>

                        <div className='profile-main-image-container'>

                            <img src="https://picsum.photos/200" alt="name" ></img>

                        </div>
                        <div >

                            <div className='profile-secondary-images'>
                                <img src="https://picsum.photos/200" alt="name" ></img>
                                <img src="https://picsum.photos/200" alt="name" ></img>
                                <img src="https://picsum.photos/200" alt="name" ></img>
                            </div>

                        </div>
                    </div>
                    <div style={{ width: 48 }}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M18 12L30 24L18 36" stroke="#001F3F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                </div>

                <div className='profile-info-container'>
                    <div style={{ width: "100%" }} className='d-flex justify-content-between'>

                        <div style={{ display: "flex" }}><h1 className='profile-title'>Slim Skhab</h1><sup className='sup-text'>trusted</sup>
                        </div>
                        <div className='claim-profile-button'>
                            Claim This Profile
                        </div>

                    </div>
                    <div className='social-media-block'>
                        <div className='icon-block' style={{ background: "white" }}><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                            <g clip-path="url(#clip0_182_703)">
                                <path d="M20.6036 0H6.30723C2.82384 0 0 2.82384 0 6.30723V20.6036C0 24.087 2.82384 26.9109 6.30723 26.9109H20.6036C24.087 26.9109 26.9109 24.087 26.9109 20.6036V6.30723C26.9109 2.82384 24.087 0 20.6036 0Z" fill="url(#paint0_radial_182_703)" />
                                <path d="M20.6036 0H6.30723C2.82384 0 0 2.82384 0 6.30723V20.6036C0 24.087 2.82384 26.9109 6.30723 26.9109H20.6036C24.087 26.9109 26.9109 24.087 26.9109 20.6036V6.30723C26.9109 2.82384 24.087 0 20.6036 0Z" fill="url(#paint1_radial_182_703)" />
                                <path d="M13.4564 2.94336C10.6015 2.94336 10.2431 2.95587 9.12192 3.00685C8.00281 3.05815 7.2389 3.23528 6.57054 3.49524C5.87906 3.76372 5.29259 4.12292 4.70833 4.70739C4.12355 5.29175 3.76435 5.87822 3.49503 6.56939C3.23433 7.23795 3.05699 8.00218 3.00664 9.12077C2.9565 10.2421 2.94336 10.6005 2.94336 13.4555C2.94336 16.3105 2.95597 16.6677 3.00685 17.7889C3.05836 18.908 3.23549 19.6719 3.49524 20.3403C3.76393 21.0318 4.12313 21.6182 4.7076 22.2025C5.29175 22.7873 5.87822 23.1473 6.56918 23.4158C7.23806 23.6758 8.00207 23.8529 9.12098 23.9042C10.2423 23.9552 10.6003 23.9677 13.4551 23.9677C16.3103 23.9677 16.6675 23.9552 17.7887 23.9042C18.9078 23.8529 19.6726 23.6758 20.3414 23.4158C21.0326 23.1473 21.6182 22.7873 22.2023 22.2025C22.7871 21.6182 23.1462 21.0318 23.4156 20.3406C23.674 19.6719 23.8514 18.9078 23.904 17.7891C23.9543 16.6679 23.9675 16.3105 23.9675 13.4555C23.9675 10.6005 23.9543 10.2423 23.904 9.12098C23.8514 8.00186 23.674 7.23806 23.4156 6.5697C23.1462 5.87822 22.7871 5.29175 22.2023 4.70739C21.6176 4.12271 21.0328 3.76351 20.3408 3.49535C19.6707 3.23528 18.9063 3.05805 17.7872 3.00685C16.6659 2.95587 16.3089 2.94336 13.4531 2.94336H13.4564ZM12.5133 4.83774C12.7933 4.83732 13.1056 4.83774 13.4564 4.83774C16.2632 4.83774 16.5958 4.84783 17.7042 4.89818C18.7291 4.94506 19.2854 5.11631 19.6559 5.26022C20.1465 5.45069 20.4963 5.67849 20.864 6.04652C21.2319 6.41444 21.4596 6.76481 21.6506 7.2554C21.7945 7.62543 21.966 8.18173 22.0126 9.20665C22.063 10.3148 22.0739 10.6476 22.0739 13.4531C22.0739 16.2586 22.063 16.5915 22.0126 17.6995C21.9658 18.7245 21.7945 19.2808 21.6506 19.6509C21.4601 20.1415 21.2319 20.4908 20.864 20.8585C20.4961 21.2264 20.1468 21.4541 19.6559 21.6447C19.2858 21.7893 18.7291 21.9601 17.7042 22.007C16.596 22.0573 16.2632 22.0683 13.4564 22.0683C10.6494 22.0683 10.3167 22.0573 9.20865 22.007C8.18372 21.9597 7.62742 21.7884 7.25656 21.6445C6.76607 21.4539 6.4156 21.2262 6.04767 20.8583C5.67975 20.4904 5.45206 20.1409 5.26106 19.6501C5.11715 19.2799 4.9457 18.7236 4.89902 17.6987C4.84867 16.5905 4.83858 16.2577 4.83858 13.4505C4.83858 10.6433 4.84867 10.3122 4.89902 9.20402C4.94591 8.1791 5.11715 7.6228 5.26106 7.25225C5.45164 6.76165 5.67975 6.41129 6.04778 6.04336C6.4157 5.67544 6.76607 5.44765 7.25666 5.25675C7.62721 5.11221 8.18372 4.94139 9.20865 4.89429C10.1784 4.85046 10.5542 4.83732 12.5133 4.83511V4.83774ZM19.0677 6.58316C18.3713 6.58316 17.8062 7.14766 17.8062 7.84418C17.8062 8.54061 18.3713 9.10563 19.0677 9.10563C19.7641 9.10563 20.3291 8.54061 20.3291 7.84418C20.3291 7.14776 19.7641 6.58274 19.0677 6.58274V6.58316ZM13.4564 8.05705C10.4751 8.05705 8.058 10.4742 8.058 13.4555C8.058 16.4368 10.4751 18.8528 13.4564 18.8528C16.4377 18.8528 18.854 16.4368 18.854 13.4555C18.854 10.4743 16.4375 8.05705 13.4561 8.05705H13.4564ZM13.4564 9.95143C15.3915 9.95143 16.9604 11.5201 16.9604 13.4555C16.9604 15.3907 15.3915 16.9596 13.4564 16.9596C11.5211 16.9596 9.95238 15.3907 9.95238 13.4555C9.95238 11.5201 11.5211 9.95143 13.4564 9.95143Z" fill="white" />
                            </g>
                            <defs>
                                <radialGradient id="paint0_radial_182_703" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.14819 28.9835) rotate(-90) scale(26.6707 24.8058)">
                                    <stop stop-color="#FFDD55" />
                                    <stop offset="0.1" stop-color="#FFDD55" />
                                    <stop offset="0.5" stop-color="#FF543E" />
                                    <stop offset="1" stop-color="#C837AB" />
                                </radialGradient>
                                <radialGradient id="paint1_radial_182_703" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-4.50767 1.93853) rotate(78.681) scale(11.9219 49.1426)">
                                    <stop stop-color="#3771C8" />
                                    <stop offset="0.128" stop-color="#3771C8" />
                                    <stop offset="1" stop-color="#6600FF" stop-opacity="0" />
                                </radialGradient>
                                <clipPath id="clip0_182_703">
                                    <rect width="26.9109" height="26.9109" fill="white" />
                                </clipPath>
                            </defs>
                        </svg></div>


                        <div className='icon-block' style={{ background: "white" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27" viewBox="0 0 28 27" fill="none">
                                <g clip-path="url(#clip0_182_708)">
                                    <path d="M22.2278 0C23.6177 0 24.8062 0.493482 25.7931 1.48045C26.7801 2.46741 27.2736 3.65586 27.2736 5.04578V21.8651C27.2736 23.255 26.7801 24.4434 25.7931 25.4304C24.8062 26.4174 23.6177 26.9109 22.2278 26.9109H18.934V16.4864H22.4205L22.9461 12.4217H18.934V9.82877C18.934 9.17469 19.0713 8.68412 19.3457 8.35708C19.6202 8.03004 20.1546 7.86652 20.9488 7.86652L23.0863 7.849V4.22234C22.3504 4.11722 21.3109 4.06466 19.9677 4.06466C18.3792 4.06466 17.109 4.53186 16.1571 5.46627C15.2052 6.40067 14.7292 7.72052 14.7292 9.42581V12.4217H11.2252V16.4864H14.7292V26.9109H5.40852C4.01859 26.9109 2.83014 26.4174 1.84318 25.4304C0.856214 24.4434 0.362732 23.255 0.362732 21.8651V5.04578C0.362732 3.65586 0.856214 2.46741 1.84318 1.48045C2.83014 0.493482 4.01859 0 5.40852 0H22.2278Z" fill="#1877F2" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_182_708">
                                        <rect width="26.9109" height="26.9109" fill="white" transform="translate(0.362732)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className='icon-block'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                                <path d="M6.37804 1.44727H1.47241L7.26105 9.16591L1.78777 15.4633H3.6449L8.12163 10.3131L11.9845 15.4633H16.8901L10.8576 7.41951L16.0491 1.44727H14.192L9.99698 6.273L6.37804 1.44727ZM12.6853 14.0617L4.27563 2.84887H5.67723L14.0869 14.0617H12.6853Z" fill="white" />
                            </svg>
                        </div>
                        <div className='icon-block'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                <g clip-path="url(#clip0_182_712)">
                                    <path d="M11.9807 6.10187C13.064 6.87584 14.3911 7.33124 15.8244 7.33124V4.57462C15.5531 4.57468 15.2826 4.54637 15.0172 4.49017V6.66004C13.584 6.66004 12.2571 6.2047 11.1736 5.43078V11.0563C11.1736 13.8705 8.89103 16.1517 6.0756 16.1517C5.02509 16.1517 4.04864 15.8343 3.23755 15.2898C4.16331 16.2359 5.45433 16.8228 6.88258 16.8228C9.69824 16.8228 11.9809 14.5417 11.9809 11.7273V6.10187H11.9807ZM12.9766 3.32077C12.4229 2.71626 12.0594 1.93503 11.9807 1.07134V0.716797H11.2158C11.4084 1.81452 12.0652 2.75234 12.9766 3.32077ZM5.0183 13.1304C4.709 12.725 4.5418 12.2291 4.54255 11.7193C4.54255 10.4322 5.58656 9.38859 6.87463 9.38859C7.11464 9.38847 7.35323 9.4253 7.58203 9.4978V6.67952C7.31466 6.64293 7.04485 6.62733 6.77517 6.63307V8.82665C6.54627 8.7541 6.30755 8.71728 6.06742 8.7175C4.77941 8.7175 3.73546 9.76099 3.73546 11.0482C3.73546 11.9585 4.25726 12.7465 5.0183 13.1304Z" fill="#FF004F" />
                                    <path d="M11.1737 5.43072C12.2572 6.20464 13.584 6.65998 15.0173 6.65998V4.49012C14.2173 4.31978 13.509 3.90196 12.9766 3.32077C12.0651 2.75228 11.4084 1.81446 11.2159 0.716797H9.20667V11.7272C9.20209 13.0108 8.15987 14.0501 6.87459 14.0501C6.11726 14.0501 5.44437 13.6893 5.01826 13.1303C4.25733 12.7465 3.73547 11.9584 3.73547 11.0483C3.73547 9.76116 4.77943 8.71756 6.06744 8.71756C6.31422 8.71756 6.55206 8.75595 6.77518 8.82671V6.63312C4.00916 6.69025 1.78467 8.94914 1.78467 11.7273C1.78467 13.1141 2.3386 14.3713 3.23768 15.2899C4.04878 15.8343 5.02516 16.1518 6.07573 16.1518C8.89122 16.1518 11.1737 13.8705 11.1737 11.0563V5.43078L11.1737 5.43072Z" fill="white" />
                                    <path d="M15.0174 4.48927V3.90269C14.296 3.90378 13.5888 3.70185 12.9767 3.31998C13.5185 3.91284 14.232 4.32168 15.0174 4.48939V4.48927ZM11.216 0.715953C11.1976 0.611071 11.1835 0.505487 11.1737 0.399461V0.0449219H8.39949V11.0555C8.39508 12.3389 7.35287 13.3783 6.06752 13.3783C5.70314 13.3788 5.34374 13.2936 5.01835 13.1296C5.44446 13.6886 6.11734 14.0493 6.87468 14.0493C8.1599 14.0493 9.20223 13.0101 9.20676 11.7265V0.716011H11.216V0.715953ZM6.77544 6.63228V6.00771C6.54362 5.97602 6.30991 5.96017 6.07593 5.96026C3.26015 5.96026 0.977661 8.24154 0.977661 11.0555C0.977661 12.8197 1.87471 14.3745 3.23788 15.2891C2.33881 14.3705 1.78487 13.1132 1.78487 11.7264C1.78487 8.94835 4.00931 6.68941 6.77544 6.63228Z" fill="#00F2EA" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_182_712">
                                        <rect width="14.8514" height="16.8193" fill="white" transform="translate(0.975464 0.0449219)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>


                    <div className="progress-bar-container">

                        <div className="progress-box">
                            <span className="mini-title">Donation Progress:</span>
                            <div className="skill-bar">
                                <span className="progress-per" style={{ width: `${donation}%` }}>
                                    <span className="tooltips">$95</span>
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className='milestones-container'>
                        <span className="mini-title">Milestones:</span>

                        <Milestone milestoneName="First Milestone" milestoneNumber="1" milestoneRange="500$ to 1000$" milestoneColor="#26ADEB" milestoneActiveColor="rgba(38, 173, 235, 0.14)" isActive={firstMilestoneIsActive} />
                        <br></br>
                        <Milestone milestoneName="Second Milestone" milestoneNumber="2" milestoneRange="1000$ to 2000$" milestoneColor="#FA7193" milestoneActiveColor="rgba(250, 113, 147, 0.14)" isActive={secondMilestoneIsActive} />
                        <br></br>
                        <Milestone milestoneName="Third Milestone" milestoneNumber="3" milestoneRange="2000$ to 3000$" milestoneColor="#8183FE" milestoneActiveColor="rgba(129, 131, 254, 0.14)" isActive={thirdMilestoneIsActive} />
                        <br></br>
                        <Milestone milestoneName="Forth Milestone" milestoneNumber="4" milestoneRange="3000$+" milestoneColor="#46DDB9" milestoneActiveColor="rgba(70, 221, 185, 0.14)" isActive={forthMilestoneIsActive} />

                    </div>
                </div>
            </div>
            <div className='button-container'>
                <div className='vote-bottons'>
                    <div className='vote-bottons-compact'>
                        <div style={{ width: 48, opacity: 0 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M30 12L18 24L30 36" stroke="#001F3F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className='vote-button natty'>
                            <span className='vote-button-text'>Natty</span>
                            <span className='vote-button-number'>200 Votes</span>
                        </div>
                        <div className='vote-button enhanced'>
                            <span className='vote-button-text'>Enhanced</span>
                            <span className='vote-button-number'>200 Votes</span>
                        </div>
                        <div style={{ width: 48, opacity: 0 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M30 12L18 24L30 36" stroke="#001F3F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='donate-button'>Donate</div>
            </div>
            <Footer />
        </div>
    );
}

export default Profile;