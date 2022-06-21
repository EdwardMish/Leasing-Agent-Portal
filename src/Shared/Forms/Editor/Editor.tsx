import * as React from 'react';
import { useField } from 'formik';

import { CKEditor } from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import StrikeThrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import { Label } from '../Label';

const styles = require('../forms.module.css');

interface EditorProps {
    id: string;
    label: string;
    name: string;
    placeholder: string;
    hideLabel?: boolean;
    required?: boolean;
    hideImageUpload?: boolean;
}

const Editor: React.FC<EditorProps> = ({
    id,
    label,
    placeholder,
    hideLabel = false,
    required = false,
    hideImageUpload = false,
    ...props
}) => {
    const [field, meta, helpers] = useField(props as any);

    const imageUploadPlugins = [
        Image,
        ImageCaption,
        ImageResize,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Base64UploadAdapter,
    ];

    return (
        <>
            <Label label={label} id={id} required={required} hideLabel={hideLabel} />
            <input {...field} {...props} hidden />
            <CKEditor
                editor={ClassicEditor}
                config={{
                    plugins: [
                        Essentials,
                        Font,
                        Autoformat,
                        Bold,
                        Italic,
                        Underline,
                        StrikeThrough,
                        BlockQuote,
                        Heading,
                        Indent,
                        Link,
                        List,
                        MediaEmbed,
                        Paragraph,
                        PasteFromOffice,
                        Table,
                        TableToolbar,
                        TextTransformation,
                        ...(!hideImageUpload ? imageUploadPlugins : [])
                    ],
                    toolbar: [
                        'undo', 'redo',
                        'bold', 'italic', 'underline', 'strikethrough', '|',
                        'fontSize', 'fontColor', 'fontBackgroundColor', '|',
                        'heading', '|',
                        'link', '|',
                        'outdent', 'indent', '|',
                        'bulletedList', 'numberedList', '|',
                        ...(!hideImageUpload ? ['uploadImage', '|'] : []),
                        'insertTable', '|',
                        'blockQuote', '|',
                    ],
                    ...(!hideImageUpload ? {
                        image: {
                            toolbar: [
                                'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText',
                                '|', 'toggleImageCaption', 'imageTextAlternative',
                            ],
                        }
                    } : {}),
                    placeholder,
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            {
                                model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1',
                            },
                            {
                                model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2',
                            },
                            {
                                model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3',
                            },
                        ],
                    },
                    initialData: field?.value || '',
                }}
                data=""
                onChange={(event, editor) => {
                    helpers.setValue(editor.getData());
                    helpers.setTouched(true);
                }}
            />
            {
                meta.touched && meta.error
                && <div className={styles.Error}><span>{meta.error}</span></div>
            }
        </>
    );
};

export default Editor;