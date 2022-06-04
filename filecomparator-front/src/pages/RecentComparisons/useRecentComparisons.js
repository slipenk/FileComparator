import {useEffect, useState} from 'react';
import axios from "../../API/axios";
import diffToastError from "../../Toast/ToastError";


const useRecentComparisons = () => {

    const GET_RECENT_COMPARISONS_URL = "/berulia/recentComparisons";

    const [recentComparisons, setRecentComparisons] = useState([]);

    useEffect(() => {
        getRecentComparisons();
    }, []);

    const getRecentComparisons = () => {
        const text  = localStorage.getItem('user');
        const object = JSON.parse(text);

        axios({
            url: GET_RECENT_COMPARISONS_URL,
            method: 'POST',
            data: JSON.stringify({email: object.email, ID: object.id}),
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then((response) => {
            if(response.data) {
                setRecentComparisons(response.data);
            }
        }
        ).catch((err) => {
            diffToastError("Помилка при отриманні останніх порівнянь \n" + err);
        })
    }

    return {recentComparisons}

}

export default useRecentComparisons;
