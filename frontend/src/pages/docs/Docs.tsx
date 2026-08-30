import React, { useState } from "react"
import { Outlet, NavLink } from "react-router-dom"
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import GlassPanel from "../../components/GlassPanel/GlassPanel"
import "./Docs.css"

const Docs: React.FC = () => {
    const [toggled, setToggled] = useState(false);

    return (
        <div className="docs-root">
            <div className="docs-container">
                {/* this page almost doesnt work on mobile without this being collapsable */}
                <button 
                    className="mobile-toggle-btn" 
                    onClick={() => setToggled(!toggled)}
                >

                    {/* https://www.piliapp.com/symbol/menu/ */}
                    ☰ Menu
                </button>

                <Sidebar
                    toggled={toggled}
                    onBackdropClick={() => setToggled(false)}
                    breakPoint="md"
                    rootStyles={{
                        color: '#000000ff',
                        borderRadius: '18px',
                        overflow: 'hidden',
                    }}
                >
                    <Menu>
                        <MenuItem 
                            component={<NavLink to="overview" />} 
                            onClick={() => setToggled(false)}
                        >
                            Overview
                        </MenuItem>

                        <SubMenu label="Contributing">
                            <MenuItem 
                                component={<NavLink to="contributing/getting-started" />} 
                                onClick={() => setToggled(false)}
                            >
                                Getting Started
                            </MenuItem>
                            <MenuItem 
                                component={<NavLink to="contributing/guidelines" />} 
                                onClick={() => setToggled(false)}
                            >
                                Guidelines
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="oseda-cli">
                            <MenuItem 
                                component={<NavLink to="cli/overview" />} 
                                onClick={() => setToggled(false)}
                            >
                                Overview
                            </MenuItem>
                            <MenuItem 
                                component={<NavLink to="cli/cargo" />} 
                                onClick={() => setToggled(false)}
                            >
                                Cargo
                            </MenuItem>
                            <MenuItem 
                                component={<NavLink to="cli/commands" />} 
                                onClick={() => setToggled(false)}
                            >
                                Commands
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="oseda-core">
                            <MenuItem 
                                component={<NavLink to="core/development" />} 
                                onClick={() => setToggled(false)}
                            >
                                Development
                            </MenuItem>
                            <MenuItem 
                                component={<NavLink to="core/frontend" />} 
                                onClick={() => setToggled(false)}
                            >
                                Frontend
                            </MenuItem>
                            <MenuItem 
                                component={<NavLink to="core/backend" />} 
                                onClick={() => setToggled(false)}
                            >
                                Backend
                            </MenuItem>
                        </SubMenu>

                        <SubMenu label="oseda-lib">
                            <MenuItem 
                                component={<NavLink to="lib/library" />} 
                                onClick={() => setToggled(false)}
                            >
                                Library
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </Sidebar>

                <GlassPanel as="main" className="docs-content">
                    <Outlet />
                </GlassPanel>
            </div>
        </div>
    )
}

export default Docs