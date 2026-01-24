import React, { useRef, useState } from "react"
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import MarkdownRenderer from "../../components/MarkdownRenderer/MarkdownRenderer"
import GlassPanel from "../../components/GlassPanel/GlassPanel"
import "./Docs.css";

const Docs: React.FC = () => {

    return (
        <div className="docs-container">
                <Sidebar>
                    <Menu>
                        <MenuItem>Overview</MenuItem>

                        <SubMenu title="Contributing">
                            <MenuItem>Getting Started</MenuItem>
                            <MenuItem>Guidelines</MenuItem>
                        </SubMenu>

                        <SubMenu title="oseda-cli">
                            <MenuItem>Cargo</MenuItem>
                            <MenuItem>Commands</MenuItem>
                        </SubMenu>

                        <SubMenu title="oseda-core">
                            <MenuItem>Frontend</MenuItem>
                            <MenuItem>Backend</MenuItem>
                        </SubMenu>

                        <SubMenu title="oseda-lib">
                            <MenuItem>API</MenuItem>
                            <MenuItem>Internals</MenuItem>
                        </SubMenu>

                        <MenuItem>Readme</MenuItem>
                    </Menu>
                </Sidebar>

            <GlassPanel
                as="main"
                style={{ flex: 1, padding: "2rem" }}
            >
                <h1>OSEDA Docs</h1>
                <MarkdownRenderer markdown={"# Hello"} />
            </GlassPanel>
        </div>
    )
}

export default Docs
