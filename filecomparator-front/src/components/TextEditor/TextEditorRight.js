import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils, ContentState } from "draft-js";
import classes from "./TextEditor.module.css"
import "draft-js/dist/Draft.css";
import {convertFromHTML} from "draft-convert";
import htmlToDraft from 'html-to-draftjs';

import {stateFromHTML} from 'draft-js-import-html';


function App({file}) {

    const sampleMarkup =
        '<p style="color:red">This is a paragraph.</p>'
    const blocksFromHTML = htmlToDraft(sampleMarkup);
    const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
    );
    //const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks);
   // const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    //let contentState1 = stateFromHTML(sampleMarkup);

    /* const state = ContentState.createFromBlockArray(
         blocksFromHTML.contentBlocks,
         blocksFromHTML.entityMap,
     );    */

    const [editorState, setEditorState] = useState(EditorState.createWithContent(
        contentState
    ));


    const editor = React.useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    useEffect(() => {
        focusEditor();
    }, []);

    const StyleButton = (props) => {
        let onClickButton = (e) => {
            e.preventDefault();
            props.onToggle(props.style);
        };
        return <button className={classes.opp} onMouseDown={onClickButton}>{props.label}</button>;
    };

    const BLOCK_TYPES = [
        { label: "H1", style: "header-one" },
        { label: "H2", style: "header-two" },
        { label: "H3", style: "header-three" },
        { label: "H4", style: "header-four" },
        { label: "H5", style: "header-five" },
        { label: "H6", style: "header-six" },
        { label: "UL", style: "unordered-list-item" },
        { label: "OL", style: "ordered-list-item" }
    ];

    const BlockStyleControls = (props) => {
        return (
            <div className={classes.alignItems}>
                {BLOCK_TYPES.map((type) => (
                    <StyleButton
                        key={type.label}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        );
    };

    const INLINE_STYLES = [
        { label: "Bold", style: "BOLD" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" },
        { label: "Monospace", style: "CODE" }
    ];
    const InlineStyleControls = (props) => {
        return (
            <div className={classes.alignItems}>
                {INLINE_STYLES.map((type) => (
                    <StyleButton
                        key={type.label}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        );
    };

    const onInlineClick = (e) => {
        let nextState = RichUtils.toggleInlineStyle(editorState, e);
        setEditorState(nextState);
    };

    const onBlockClick = (e) => {
        let nextState = RichUtils.toggleBlockType(editorState, e);
        setEditorState(nextState);
    };

    return (
        <div>
            <div className={classes.alignEditor} onClick={focusEditor}>
                <div className={classes.alignItems}>
                    <BlockStyleControls onToggle={onBlockClick} />
                    <InlineStyleControls onToggle={onInlineClick} />
                </div>
                <div className={classes.textDiv}>
                    <Editor
                        ref={editor}
                        editorState={editorState}
                        onChange={(editorState) => setEditorState(editorState)}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;

