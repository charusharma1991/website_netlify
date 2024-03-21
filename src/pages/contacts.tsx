function Contacts(){
    return (
        <>
        <div className="pageHeader">
            <div className="headerContent">
                <div className="sectionContainer">
                    <h2 className="pageTitle">Contacts</h2>
                </div>
            </div>
        </div>
        <div className="pageContents">
            <div className="section color-1">
                <div className="sectionContainer">
                    <div className="d-flex flex-row justify-content-start">
                        <div className="imgWrapper">
                            <img/>
                        </div>
                        <div>
                            <p><strong>Charu Sharma</strong></p>
                            <p>Assistant Professor</p>
                            <p>International Institute of Information Technology (IIIT) Hyderabad</p>
                            <p>kohli reserach block, Machine Learning Lab</p>
                            <p>3rd floor, office: F17</p>
                            <p>Email: charu (dot) sharma (at) iiit (dot) ac (dot) in</p>
                            <p>
                                <strong className="contactsIcons">
                                    <a href="https://mll.iiit.ac.in/">
                                        <img width={'34px'} src="https://mll.iiit.ac.in/wp-content/uploads/2020/01/cropped-2-1.png"/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/shcharu">
                                        <img width={'34px'} src="https://i.postimg.cc/pdC9bwNq/linkedin-Icon.png"/>
                                    </a>
                                    <a href="https://scholar.google.com.tw/citations?user=bftN0M0AAAAJ&hl=en&oi=sra">
                                        <img width={'34px'} src="https://i.postimg.cc/G2NmbrXJ/google-Scholar-Icon.png"/>
                                    </a>
                                    {/* <a href="https://mll.iiit.ac.in/">
                                        <img width={'34px'} src="https://i.postimg.cc/43fd5WKt/github-Icon.png"/>
                                    </a> */}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Contacts;
