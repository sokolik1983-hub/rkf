import React from 'react';
import {connect, getIn} from "formik";
import {Editor, EditorState, convertToRaw, RichUtils} from 'draft-js';

export const NoOptionsMessage = () => {
    return ('Нет опций для выбора');
};

function DraftJs({
                     formik,
                     id,
                     name,
                     className,
                     placeholder,
                     disabled,

                 }) {
    // const value = getIn(name, formik.values);
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    const onChange = editorState => {
        console.log(convertToRaw(editorState.getCurrentContent()));
        setEditorState(editorState);
    }

    const editor = React.useRef(null);

    const onBoldClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }

    function focusEditor() {
        editor.current.focus();
    }

    React.useEffect(() => {
        focusEditor()
    }, []);

    return (
        <div onClick={focusEditor}>
            <button onClick={onBoldClick}>B</button>
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={onChange}
            />
        </div>
    );
}

export default connect(DraftJs)