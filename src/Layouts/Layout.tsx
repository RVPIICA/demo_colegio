import React, { useRef } from "react";
import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";

const Layout: React.FC<{children:any}> = ({children}) => {
    const appContainer = useRef(null)

    return(
        <>
            <div ref={appContainer} id="app-wrapper">
                <Header />
                <main id="main" className="main">
                    {children}
                </main>
                <Footer />
            </div>
        </>        
    )
}

export default Layout