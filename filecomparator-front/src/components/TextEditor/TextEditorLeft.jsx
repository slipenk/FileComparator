import React, {useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./StyleSize.css";
import classes from "./TextEditor.module.css";



const modules = {
    clipboard: {
        matchVisual: false
    },
    toolbar: [
        [
            { size: ["0.75em", "1em", "1.5em", "2.5em"] },
            "bold",
            "italic",
            "underline",
            { color: [] },
            { background: [] },
            { align: [] },
        ]
    ]
};

const EditorLeft = ({file, fileOr})  => {

    const [text, setText] = useState(file);
    const [counter, setCounter] = useState(0);

    const handleChange = (content) => {
        if(text.includes("style") && counter === 1) {
            setText(fileOr);
        } else {
            setText(content);
            setCounter(0);
            return;
        }
        setCounter(counter + 1);
    }
    return (
        <div className={classes.textDiv} data-text-editor="form-editor">
            <ReactQuill
                value={text}
                onChange={handleChange}
                modules={modules}
            >
                <div className={classes.quillText} >

                </div>
            </ReactQuill>
        </div>
    );
};

export default EditorLeft;

