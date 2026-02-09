import React from 'react';
import ClearTags from '../ClearTags/ClearTags';
import Tag, { TagName } from '../Tag/Tag';
import HomeButton from '../HomeButton/HomeButton';
import "./Controller.css";

interface ControllerProps {
    tags: string[];
}

const Controller = ({ tags }: ControllerProps) => {

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