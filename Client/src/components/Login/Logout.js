import { useNavigate } from "react-router-dom";
const Logout =()=>{
    const navigate = useNavigate();
    sessionStorage.getItem('token')
    navigate('/login');
}
export default Logout;