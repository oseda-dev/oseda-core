import React from 'react';
import "./HomeButton.css"
import { useNavigate } from 'react-router-dom';

const HomeButton: React.FC = () => {

    const nav = useNavigate();

    return (
        <>
            <img 
                src="/OsedaHomeDark.png" 
                className="outline home-btn" 
                onClick={() => {nav("/")}}
            ></img>
        </>
    );
};

export default HomeButton;