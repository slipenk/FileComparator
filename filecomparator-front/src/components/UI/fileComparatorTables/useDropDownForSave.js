import {htmlToText} from "html-to-text";


const useDropDownForSave = (isFirstFile) => {

    const saveFileFromEditors = (item, type) => {

        if(isFirstFile && item === "html") {
            const file = localStorage.getItem('leftEditor');
            saveFile('yourFile.' + item, file, type);
        } else if(!isFirstFile && item === "html") {
            const file = localStorage.getItem('rightEditor');
            saveFile('yourFile.' + item, file, type);
        } else if(isFirstFile) {
            const file = localStorage.getItem('leftEditor').replace(/<\/p>/g, "</br>").replace(/<p>/g, "");
            const text = htmlToText(file, {
                wordwrap: 130
            });
            saveFile('yourFile.' + item, text, type);
        }  else if(!isFirstFile) {
            const file = localStorage.getItem('rightEditor').replace(/<\/p>/g, "</br>").replace(/<p>/g, "");
            const text = htmlToText(file, {
                wordwrap: 130
            });
            saveFile('yourFile.' + item, text, type);
        }
    }

    const saveFile = (fileName, text, type) => {
        let blob = new Blob([text], {type: type});
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
    }

    return {saveFileFromEditors}
}

export default useDropDownForSave;