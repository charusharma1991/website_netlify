# steps to add new pages,
1) create a new "newpage.tsx" file in "pages" folder
2) add the below default code in the "newpage.tsx".

function Contacts(){
    return (
        <>
        <div className="pageHeader">
            <div className="headerContent">
                <div className="sectionContainer">
                    <h2 className="pageTitle">New Page</h2>
                </div>
            </div>
        </div>
        <div className="pageContents">
            <div className="section color-1">
                <div className="sectionContainer">
                    <div className="d-flex flex-row justify-content-start">
                        add your content here
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Contacts;

3) go to SidebarContent.tsx, add this code in between the list of buttons inside <ul></ul>


                <li>
                    <a href="/newpage">
                        <i style={{width:'50px'}} className="fa fa-project-diagram"></i>
                        <p>Newpage</p>
                    </a>
                </li>

4) go to MainPage.tsx, add the below two code segments for routing.(u will understand when u see other routes)
        import NewPage from "./pages/NewPage"

        case "/NewPage":
            component = <NewPage/>
            break
Now, the new page must have been added to the site.

