import {useState} from 'react';
import axios from "../../API/axios";
import diffToast from "../../Toast/Toast";


const useFileComparator = () => {

    const [isUploadFileFirst, SetIsUploadFileFirst] = useState(false);
    const [isUploadFileSecond, SetIsUploadFileSecond] = useState(false);
    const [isCompared, setIsCompared] = useState(false);
    const [leftFile, setLefFile] = useState("");
    const [rightFile, setRightFile] = useState("");

    let counter = 0;

    const isUpload = (value) => {
        counter++;
        if(counter === 1)  {
            SetIsUploadFileFirst(value);
        } else if(counter === 2) {
            counter = 0;
            SetIsUploadFileSecond(value);
        }
    }

    const setComparedFiles = (value) => {
        counter++;
        if(counter === 1)  {
            setLefFile(value.replace(/`/g, '"'));
        } else if(counter === 2) {
            counter = 0;
            setRightFile(value.replace(/`/g, '"'));
            setIsCompared(true);
            getStatistics();
        }
    }

    const getStatistics = () => {
        const GET_STATISTICS_URL = "/berulia/statistics_file";

        axios({
            url: GET_STATISTICS_URL,
            method: 'GET',
        }).then((response) => {
                if(response.data) {
                    console.log("response.data  " + response.data);
                }
            }
        ).catch((err) => {
            console.log(err)
            diffToast("Помилка при отриманні статистики");
        })
    }


    return { isCompared, leftFile, rightFile, isUploadFileFirst, isUploadFileSecond, isUpload, setComparedFiles};

}

export default useFileComparator;