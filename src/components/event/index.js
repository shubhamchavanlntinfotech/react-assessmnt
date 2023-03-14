import { useNavigate } from "react-router-dom";
import EventForm from "./eventForm"
import EventList from "./eventList"
import styles from "../../Event.module.css";

const Event = () => {
    const navigate = useNavigate();
    const user = JSON.parse(window.localStorage.getItem("user"))
    const logout = () => {
        window.localStorage.removeItem("user")
        navigate("/")
    }
    return (
        <>
            <div className={styles.logoutWrapper}>
                <h2>Hello {user.userName}</h2>
                <button onClick={() => logout()}>Logout</button>
            </div>
            <EventForm />
            <EventList />
        </>
    )
}

export default Event;