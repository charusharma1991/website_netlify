function Projects(){
    return (
        <>
        <div className="pageHeader">
            <div className="headerContent">
                <div className="sectionContainer">
                    <h2 className="pageTitle">Projects</h2>
                </div>
            </div>
        </div>
        <div className="pageContents">
            <div className="section color-1">
                <div className="sectionContainer">
                    <div className="d-flex flex-row justify-content-start">
                        <div className="wristTryOn" style={{display:"flex", }}>
                            <img width={"40%"} src="wristTryOnImage.png"></img>
                            <div style={{padding:"20px"}}>
                                <h3>Wrist Try-On</h3>
                                <p>Making a wrist try on by leveraging mediapipe</p>
                                <button><a href="../../wristTryOn.html">try demo</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Projects;