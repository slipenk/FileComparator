import {toast} from "react-toastify";

export default function diffToastSuccess (message) {
    toast.success(message, {
        position: "top-center",
        theme: "colored",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}