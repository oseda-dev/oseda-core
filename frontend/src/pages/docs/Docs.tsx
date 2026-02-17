import { Outlet, NavLink } from "react-router-dom"
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import GlassPanel from "../../components/GlassPanel/GlassPanel"
import "./Docs.css"

const Docs: React.FC = () => {
    return (
        <div className="docs-root">
            <div className="docs-container">
                <Sidebar
                    rootStyles={{
                        color: '#000000ff',
                        borderRadius: '18px',
                        overflow: 'hidden',
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
        </div>
    )
}

export default Docs
