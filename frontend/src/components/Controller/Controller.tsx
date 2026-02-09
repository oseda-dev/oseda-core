import React from 'react';
import ClearTags from '../ClearTags/ClearTags';
import Tag, { TagName } from '../Tag/Tag';
import { useNavigate } from 'react-router-dom';
import "./Controller.css";
import HomeButton from '../HomeButton/HomeButton';

interface ControllerProps {
    tags: string[];
}

const Controller = ({ tags }: ControllerProps) => {

    const nav = useNavigate()

    return (
        <div className='controller'>

            <HomeButton />
            {tags.length != 0 ? <ClearTags /> : <></>}
            {tags.map(t => (
                <Tag key={t} tagName={t} />
            ))}
        </div>
    );
};

export default Controller;