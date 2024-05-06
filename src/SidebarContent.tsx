function SidebarContent(){
    return <>
        <div className="profileContainer">
            <div className="portrate">
                <a className="circleFrame">
                    {/* <img className="circleFrame" width={'125px'} src = "./public/CharuSharmaProfile2.jpeg"/> */}
                    <a><img className="circleFrame" width={'125px'} src="CharusharmaProfile2.jpeg" alt="Charu-Sharma-Profile2" /></a>
                </a>
            </div>
            <div className="title">
                <h2>Charu Sharma</h2>
                <h3>Assistant Professor, IIIT Hyderabad (ML Lab)</h3>
            </div>
        </div>
        <div className="mainNav">
            <ul id="Navigation" style={{paddingLeft:'0px'}}>
                <li>
                    <a href="/home">
                        <i style={{width:'50px'}} className="fa fa-home"></i>
                        <p>Home</p>
                    </a>
                </li>
                {/*<li>
                    <a href="/projects">
                        <i style={{width:'50px'}} className="fa fa-project-diagram"></i>
                        <p>Projects</p>
                    </a>
                </li>*/}
                {/* <li>
                    <a href="/publications">
                        <i style={{width:'50px'}} className="fa fa-graduation-cap"></i>
                        <p>Publications</p>
                    </a>
                </li> */}
                <li>
                    <a href="/research">
                        <i style={{width:'50px'}} className="fa fa-file-text" aria-hidden="true"></i>
                        <p>Research</p>
                    </a>
                </li>
                <li>
                    <a href="/stuents">
                        <i style={{width:'50px'}} className="fa fa-file-text" aria-hidden="true"></i>
                        <p>Students</p>
                    </a>
                </li>
                <li>
                    <a href="/teaching">
                        <i style={{width:'50px'}} className="fa fa-university"></i>
                        <p>Teaching</p>
                    </a>
                </li>
                <li>
                    <a href="/experience">
                        <i style={{width:'50px'}} className="fa fa-history"></i>
                        <p>Experience</p>
                    </a>
                </li>
                <li>
                    <a href="/others">
                        <i style={{width:'50px'}} className="fa fa-info-circle"></i>
                        <p>Others</p>
                    </a>
                </li>
                {/* <li>
                    <a href="/media">
                        <i style={{width:'50px'}} className="fa fa-video-camera"></i>
                        <p>Media</p>
                    </a>
                </li> */}
                {/* <li>
                    <a href="/resources">
                        <i style={{width:'50px'}} className="fa fa-folder-o"></i>
                        <p>Resources</p>
                    </a>
                </li> */}
                <li>
                    <a href="/contacts">
                        <i style={{width:'50px'}} className="fa fa-address-card-o"></i>
                        <p>Contact</p>
                    </a>
                </li>
            </ul>
        </div>
        <div className="sidebarFooter">
            <div className="socialIcons">
                <ul>
                    <li>
                        <a target="_blank" href="https://www.linkedin.com/in/shcharu">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://twitter.com/sh_charu">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://scholar.google.com.tw/citations?user=bftN0M0AAAAJ&hl=en&oi=sra">
                            <i className="fa fa-google"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="sideFooterWidget">
                {/* <div className="twitterFollow">
                    
                </div> */}
                <div className="textWidget">
                    <p><a href = "https://www.iiit.ac.in/about/infrastructure/">Accessebility</a></p>
                </div>
            </div>
            <div className="copyright">Copyright © Charu Sharma</div>
        </div>
    </>
}

export default SidebarContent;
