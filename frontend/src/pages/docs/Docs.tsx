// import React, { useRef, useState } from "react"
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
// import MarkdownRenderer from "../../components/MarkdownRenderer/MarkdownRenderer"
// import GlassPanel from "../../components/GlassPanel/GlassPanel"
// // import 'react-pro-sidebar/dist/css/styles.css';
// import "./Docs.css";
// const Docs: React.FC = () => {


//     return (
//         <div className="docs-container">
//             <Sidebar
//                 rootStyles={{
//                     color: '#000000ff',
//                 }}            >
//                 <Menu style={{ color: "black" }}>
//                     <MenuItem>Overview</MenuItem>

//                     <SubMenu label="Contributing">
//                         <MenuItem>Getting Started</MenuItem>
//                         <MenuItem>Guidelines</MenuItem>
//                     </SubMenu>

//                     <SubMenu label="oseda-cli">
//                         <MenuItem>Cargo</MenuItem>
//                         <MenuItem>Commands</MenuItem>
//                     </SubMenu>

//                     <SubMenu label="oseda-core">
//                         <MenuItem>Frontend</MenuItem>
//                         <MenuItem>Backend</MenuItem>
//                     </SubMenu>

//                     <SubMenu label="oseda-lib">
//                         <MenuItem>API</MenuItem>
//                         <MenuItem>Internals</MenuItem>
//                     </SubMenu>

//                     <MenuItem>Readme</MenuItem>
//                 </Menu>
//             </Sidebar>

//             <GlassPanel
//                 as="main"
//                 style={{ color: "black", flex: 1, padding: "2rem" }}
//             >
//                 <h1>OSEDA Docs</h1>
//                 <MarkdownRenderer markdown={"# Hello"} />
//             </GlassPanel>
//         </div>
//     )
// }

// export default Docs

import { Outlet, NavLink } from "react-router-dom"
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import GlassPanel from "../../components/GlassPanel/GlassPanel"
import "./Docs.css"

const Docs: React.FC = () => {
    return (
        <>
            <div className="docs-container">
                <Sidebar
                    rootStyles={{
                        color: '#000000ff',
                    }}
                >
                    <Menu>
                        <MenuItem component={<NavLink to="overview" />}>
                            Overview
                        </MenuItem>

                        <SubMenu label="Contributing">
                            <MenuItem component={<NavLink to="contributing/getting-started" />}>
                                Getting Started
                            </MenuItem>
                            <MenuItem component={<NavLink to="contributing/guidelines" />}>
                                Guidelines
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="oseda-cli">
                            <MenuItem component={<NavLink to="cli/overview" />}>
                                Overview
                            </MenuItem>

                            <MenuItem component={<NavLink to="cli/cargo" />}>
                                Cargo
                            </MenuItem>
                            <MenuItem component={<NavLink to="cli/commands" />}>
                                Commands
                            </MenuItem>
                        </SubMenu>
                        {/* todo implement the ones below this */}
                        <SubMenu label="oseda-core">
                            <MenuItem component={<NavLink to="core/frontend" />}>
                                Frontend
                            </MenuItem>
                            <MenuItem component={<NavLink to="core/backend" />}>
                                Backend
                            </MenuItem>
                        </SubMenu>
                        <SubMenu label="oseda-lib">
                            <MenuItem component={<NavLink to="lib/api" />}>
                                API
                            </MenuItem>
                            <MenuItem component={<NavLink to="lib/internal" />}>
                                Internals
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </Sidebar>

                <GlassPanel as="main" style={{ flex: 1, padding: "2rem", width: "60vh" }}>
                    <Outlet />
                </GlassPanel>
            </div>
        </>
    )
}

export default Docs
