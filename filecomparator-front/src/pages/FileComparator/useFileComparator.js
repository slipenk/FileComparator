import {useState} from 'react';
import axios from "../../API/axios";
import diffToastError from "../../Toast/ToastError";


const useFileComparator = () => {

    const [isUploadFileFirst, SetIsUploadFileFirst] = useState(false);
    const [isUploadFileSecond, SetIsUploadFileSecond] = useState(false);
    const [isCompared, setIsCompared] = useState(false);
    const [leftFile, setLefFile] = useState("");
    const [rightFile, setRightFile] = useState("");
    const [leftFileOr, setLeftFileOr] = useState("");
    const [rightFileOr, setRightFileOR] = useState("");
    const [leftFileName, setLefFileName] = useState("");
    const [rightFileName, setRightFileName] = useState("");
    const [statistics, setStatistics] = useState([]);

    let counterIsUpload = 0;
    let counterSetComparedFiles = 0;
    let counterSetFileName = 0;

    const GET_STATISTICS_URL = "/berulia/statistics_file";

    const isUpload = (value) => {
        counterIsUpload++;
        if(counterIsUpload === 1)  {
            SetIsUploadFileFirst(value);
        } else if(counterIsUpload === 2) {
            counterIsUpload = 0;
            SetIsUploadFileSecond(value);
        }
    }

    const setComparedFalse = (value) => {
        setIsCompared(value);
    }

    const setOriginalFilesLeft = (leftFile) => {
        setLeftFileOr(leftFile);
    }

    const setOriginalFilesRight = (rightFile) => {
        setRightFileOR(rightFile);
    }

    const setComparedFiles = (value) => {
        counterSetComparedFiles++;
        if(counterSetComparedFiles === 1)  {
            setLefFile(value.replace(/`/g, '"'));
        } else if(counterSetComparedFiles === 2) {
            counterSetComparedFiles = 0;
            setRightFile(value.replace(/`/g, '"'));
            getStatistics().then(() => setIsCompared(true));
        }
    }

    const setFileName = (value) => {
        counterSetFileName++;
        if(counterSetFileName === 1)  {
            setLefFileName(value);
        } else if(counterSetFileName === 2) {
            counterSetFileName = 0;
            setRightFileName(value);
        }
    }

    const getStatistics = () => {
        return axios({
            url: GET_STATISTICS_URL,
            method: 'GET',
        }).then((response) => {
                if(response.data) {
                    setStatistics(response.data);
                }
            }
        ).catch(() => {
            diffToastError("Помилка під час отримання статистики");
        })
    }

    const zeroStatistics = () => {
        setStatistics([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setLefFileName("");
        setRightFileName("");
    }

    return { isCompared, leftFile, rightFile, isUploadFileFirst, isUploadFileSecond, isUpload, setComparedFiles, setFileName, statistics,
        leftFileName, rightFileName, setComparedFalse, leftFileOr, rightFileOr, setOriginalFilesLeft, setOriginalFilesRight, zeroStatistics};

}

export default useFileComparator;