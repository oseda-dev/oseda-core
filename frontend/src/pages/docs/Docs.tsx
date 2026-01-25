import React, { useRef, useState } from "react"
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import MarkdownRenderer from "../../components/MarkdownRenderer/MarkdownRenderer"
import GlassPanel from "../../components/GlassPanel/GlassPanel"
// import 'react-pro-sidebar/dist/css/styles.css';
import "./Docs.css";
const Docs: React.FC = () => {


    return (
        <div className="docs-container">
            <Sidebar
                rootStyles={{
                    color: '#000000ff',
                }}            >
                <Menu style={{ color: "black" }}>
                    <MenuItem>Overview</MenuItem>

                    <SubMenu label="Contributing">
                        <MenuItem>Getting Started</MenuItem>
                        <MenuItem>Guidelines</MenuItem>
                    </SubMenu>

                    <SubMenu label="oseda-cli">
                        <MenuItem>Cargo</MenuItem>
                        <MenuItem>Commands</MenuItem>
                    </SubMenu>

                    <SubMenu label="oseda-core">
                        <MenuItem>Frontend</MenuItem>
                        <MenuItem>Backend</MenuItem>
                    </SubMenu>

                    <SubMenu label="oseda-lib">
                        <MenuItem>API</MenuItem>
                        <MenuItem>Internals</MenuItem>
                    </SubMenu>

                    <MenuItem>Readme</MenuItem>
                </Menu>
            </Sidebar>

            <GlassPanel
                as="main"
                style={{ color: "black", flex: 1, padding: "2rem" }}
            >
                <h1>OSEDA Docs</h1>
                <MarkdownRenderer markdown={"# Hello"} />
            </GlassPanel>
        </div>
    )
}

export default Docs
