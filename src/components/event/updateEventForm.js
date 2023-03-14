import { useState } from "react";
import clsx from "clsx";
import styles from "../../LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addEvents } from "../../store/eventSlice";

const EventForm = () => {
    const dispatch = useDispatch()
    const { editMode } = useSelector(state => state.event)
    const { isEdit, row } = editMode;
    const formInitialState = {
        eventName: "",
        eventDate: "",
        eventDesc: "",
        price: "",
        bookingType: "normal",
        acceptTerms: false,
    }
    const [form, setForm] = useState(formInitialState);

    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value,
        };
        setForm(nextFormState);
    };

    const onSubmitForm = e => {
        e.preventDefault();

        dispatch(addEvents(form))
        setForm(formInitialState)
    };

    return (
        <form className={styles.form} onSubmit={onSubmitForm}>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Event Name</label>
                <input
                    className={clsx(
                        styles.formField,
                    )}
                    type="text"
                    aria-label="Event Name"
                    name="eventName"
                    value={isEdit ? row.eventName : form.eventName}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Event Date</label>
                <input
                    className={clsx(
                        styles.formField,
                    )}
                    type="date"
                    aria-label="Event Date"
                    name="eventDate"
                    value={isEdit ? row.eventDate : form.eventDate}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Event Description</label>
                <input
                    className={clsx(
                        styles.formField,
                    )}
                    type="text"
                    aria-label="Event Description"
                    name="eventDesc"
                    value={isEdit ? row.eventDesc : form.eventDesc}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Price</label>
                <input
                    className={clsx(
                        styles.formField,
                    )}
                    type="number"
                    aria-label="Price"
                    name="price"
                    value={isEdit ? row.price : form.price}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles.formGroup}>
                <div>
                    <label htmlFor="premium" className={styles.formLabel}>Premium</label>
                    <input
                        className={clsx(
                            styles.formField,
                        )}
                        type="radio"
                        id="premium"
                        aria-label="Booking Type"
                        name="bookingType"
                        value={isEdit ? row.bookingType : form.bookingType}
                        checked={isEdit ? row.bookingType : form.bookingType === "premium"}
                        onChange={() => {
                            setForm({ ...form, bookingType: "premium" })
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="normal" className={styles.formLabel}>Normal</label>
                    <input
                        className={clsx(
                            styles.formField,
                        )}
                        type="radio"
                        id="normal"
                        aria-label="Booking Type"
                        name="bookingType"
                        value={isEdit ? row.bookingType : form.bookingType}
                        checked={isEdit ? row.bookingType : form.bookingType === "normal"}
                        onChange={() => {
                            setForm({ ...form, bookingType: "normal" })
                        }}
                    />
                </div>
            </div>

            <div className={styles.formGroup}>
                <div>
                    <label className={styles.formLabel}>I accept terms & conditions</label>
                    <input
                        className={clsx(
                            styles.formField,
                        )}
                        type="checkbox"
                        aria-label="Accept Terms and Conditions"
                        name="acceptTerms"
                        value={isEdit ? row.acceptTerms : form.acceptTerms}
                        checked={isEdit ? row.acceptTerms : form.acceptTerms}
                        onChange={(e) => {
                            setForm({ ...form, acceptTerms: e.target.checked })
                        }}
                    />
                </div>
            </div>
            <div className={styles.formActions}>
                < button className={styles.formSubmitBtn} type="submit">
                    Update
                </button>
            </div>
        </form >
    );
};

export default EventForm;