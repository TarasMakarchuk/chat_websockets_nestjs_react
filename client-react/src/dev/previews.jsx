import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import {Chat} from "../components/Chat";
import {Message} from "../components/message/Message";
import {Button} from "../components/button/Button";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Chat">
                <Chat/>
            </ComponentPreview>
            <ComponentPreview path="/Message">
                <Message/>
            </ComponentPreview>
            <ComponentPreview path="/Button">
                <Button/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;