import React from "react";
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

class EditorLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.file
        };
    }

    handleChange (value) {
       // console.log(this.state.text)
       /* if(this.state.text.includes("style")) {
            console.log(this.props.fileOr)
            this.setState({
                text: this.props.fileOr
            });
        }*/
        this.setState({
            text: value
        });
    }

    render() {
        return (
            <div className={classes.textDiv} data-text-editor="form-editor">
                <ReactQuill
                    defaultValue={this.state.text}
                    onChange={this.handleChange.bind(this)}
                    bounds={`[data-text-editor="form-editor"]`}
                    modules={modules}
                >
                <div className={classes.quillText} >

                </div>
                </ReactQuill>
            </div>
        );
    }
}

export default EditorLeft;

