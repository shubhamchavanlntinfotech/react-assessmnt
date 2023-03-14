
import styles from "../../Event.module.css";
import { useDispatch, useSelector } from 'react-redux';
import clsx from "clsx";
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import { removeEvent, editFormEnable } from "../../store/eventSlice";
import { useMemo } from "react";

const EventList = () => {
    const { events } = useSelector(state => state.event)
    const dispatch = useDispatch()
    const totalPrice = useMemo(() => {
        const initialValue = 0;
        const total = events.reduce(
            (accumulator, currentValue) => Number(accumulator) + Number(currentValue.price),
            initialValue
        );
        return total
    }, [events]);

    return (
        events?.length > 0 ?
            <table className={styles.table}>
                <tr className={styles.tr}>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th>Event Description</th>
                    <th>Booking Type</th>
                    <th>T&C Accepted</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                <tbody>
                    {events.map((val, index) => {
                        return (
                            <tr className={clsx(
                                styles.tr,
                                val.bookingType === "premium" ? styles.premiumType : ""
                            )}
                                key={index}>
                                <td>{val.eventName}</td>
                                <td>{val.eventDate}</td>
                                <td>{val.eventDesc}</td>
                                <td>{val.bookingType}</td>
                                <td>{val.acceptTerms ? "Accepted" : "Denied"}</td>
                                <td>{val.price}</td>
                                <td>
                                    <button onClick={() => dispatch(removeEvent(events[index].eventName))}><AiTwotoneDelete /></button>
                                    <button onClick={() => dispatch(editFormEnable({ isEdit: true, row: events[index] }))}><AiTwotoneEdit /></button>
                                </td>
                            </tr>
                        )
                    })}
                    <tr className={styles.totalPrice}>
                        <td colSpan={5} >Total</td>
                        <td colSpan={1} >
                            {totalPrice}
                        </td>
                    </tr>
                </tbody>
            </table> : <></>
    )
}

export default EventList