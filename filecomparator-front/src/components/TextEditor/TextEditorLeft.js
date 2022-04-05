import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./StyleSize.css";


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
            text: '<span style="background-color: red;">test</span>'
        };
    }

    handleChange(value) {
        this.setState({ text: value });
    }

    render() {
        return (
            <div data-text-editor="form-editor">
                <ReactQuill
                    value={this.state.text}
                    onChange={(val) => {
                        this.setState({
                            text: val
                        });
                    }}
                    bounds={`[data-text-editor="form-editor"]`}
                    modules={modules}
                />
            </div>
        );
    }
}

export default EditorLeft;

