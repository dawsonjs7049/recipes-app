import { toast } from 'react-toastify';

export default function toastMessage(message,type)
{
    if(type == "error")
    {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500
        });
    }
    else 
    {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500
        })
    }
}