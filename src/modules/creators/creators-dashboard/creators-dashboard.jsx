import React, { useState, useEffect } from 'react';
import "./creators-dashboard.css"
import CreatContentComponent from '../create-content/create-content';
import ContentListComponent from '../content-list/content-list';
const CreatorDashboard = () => {
    const [sideItem, setSideItem] = useState();
    const [navigatePath, setNavigatePath] = useState('');


    useEffect(() => {
        const navArray = [
            { id: 1, title: "Create Content", path: '/creator/create-content' },
            { id: 2, title: "Content List", path: '/creator/content-list' },
        ]
        setSideItem(navArray)
    }, [])

    const handleNavigate = (path) => {
        setNavigatePath(path)

    }

    return (
        <div className="main-div">
            <div className="sidebar">
                <h3>Creator Dashboard</h3>
                <div className="sidebar-navbar">
                    {sideItem?.map((nav, key) => (
                        <div key={key.id} onClick={() => { handleNavigate(nav.path) }} >
                            <h4>{nav.title}</h4>
                        </div>
                    )
                    )}

                </div>
            </div>
            <div className="side-body">
                {navigatePath === '/creator/create-content' && <CreatContentComponent />}
                {navigatePath === '/creator/content-list' && <ContentListComponent />}

            </div>
        </div>
    )
}

export default CreatorDashboard