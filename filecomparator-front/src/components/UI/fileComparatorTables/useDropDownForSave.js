import {htmlToText} from "html-to-text";


const useDropDownForSave = (isFirstFile) => {

    const saveFileFromEditors = (item, type) => {

        if(isFirstFile) {
            const file = localStorage.getItem('leftEditor');
            const text = htmlToText(file, {
                wordwrap: 130
            });
            saveFile('yourFile.' + item, text, type)
        }  else {
            const file = localStorage.getItem('rightEditor');
            const text = htmlToText(file, {
                wordwrap: 130
            });
            saveFile('yourFile.' + item, text, type)
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