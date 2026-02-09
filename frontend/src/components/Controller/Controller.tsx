import React from 'react';
import ClearTags from '../ClearTags/ClearTags';
import Tag, { TagName } from '../Tag/Tag';
import { useNavigate } from 'react-router-dom';
import "./Controller.css";

interface ControllerProps {
    tags: string[];
}

const Controller = ({ tags }: ControllerProps) => {

    const nav = useNavigate()

    return (
        <div className='controller'>

            <img src="/OsedaHomeDark.png" onClick={() => {nav("/")}}></img>
            {tags.length != 0 ? <ClearTags /> : <></>}
            {tags.map(t => (
                <Tag key={t} tagName={t} />
            ))}
        </div>
    );
};

export default Controller;