import React from 'react';
import parse from 'html-react-parser';

const styles = require('./editor-content-display.module.css');

interface EditorProps {
    content?: string;
}

export const EditorContentDisplay: React.FC<EditorProps> = ({ content }) => <div className={`${styles.Content} ck-content`}>{!!content ? parse(content) : ''}</div>;
