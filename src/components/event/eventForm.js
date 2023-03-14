import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "../../LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addEvents, editFormEnable, updateEvent } from "../../store/eventSlice";
import { useLoginFormValidator } from "../../hooks/useLoginFormValidator";

const EventForm = () => {
    const dispatch = useDispatch()
    const { editMode } = useSelector(state => state.event)
    const { isAllFildsAdded, isEventAlreadyExists } = useLoginFormValidator()
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
    const [currentFormData, setCurrentFormData] = useState({})

    useEffect(() => {
        const formData = {
            eventName: row.eventName,
            eventDate: row.eventDate,
            eventDesc: row.eventDesc,
            price: row.price,
            bookingType: row.bookingType,
            acceptTerms: row.acceptTerms,
        }
        setCurrentFormData({
            ...formData
        })
        setForm({ ...formData })
    }, [editMode, row])

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
        if (!isAllFildsAdded(form)) {
            return;
        }

        if (isEventAlreadyExists(form)) {
            return;
        }

        if (isEdit) {
            dispatch(updateEvent({ currentForm: currentFormData, updatedForm: form }))
            dispatch(editFormEnable({ isEdit: false, row: {} }))
        } else {
            dispatch(addEvents(form))
        }
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
                    value={form.eventName}
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
                    value={form.eventDate}
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
                    value={form.eventDesc}
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
                    value={form.price}
                    onChange={onUpdateField}
                />
            </div>
            <div className={styles.formGroup}>
                <div>
                    <label className={styles.formLabel}>Booking Type</label>
                </div>
                <div>
                    <input
                        className={clsx(
                            styles.formField,
                        )}
                        type="radio"
                        id="premium"
                        aria-label="Booking Type"
                        name="bookingType"
                        value={form.bookingType}
                        checked={form.bookingType === "premium"}
                        onChange={() => {
                            setForm({ ...form, bookingType: "premium" })
                        }}
                    />
                    <label htmlFor="premium" className={styles.formLabel}>Premium</label>
                    <input
                        className={clsx(
                            styles.formField,
                        )}
                        type="radio"
                        id="normal"
                        aria-label="Booking Type"
                        name="bookingType"
                        value={form.bookingType}
                        checked={form.bookingType === "normal"}
                        onChange={() => {
                            setForm({ ...form, bookingType: "normal" })
                        }}
                    />
                    <label htmlFor="normal" className={styles.formLabel}>Normal</label>
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
                        value={form.acceptTerms}
                        checked={form.acceptTerms}
                        onChange={(e) => {
                            setForm({ ...form, acceptTerms: e.target.checked })
                        }}
                    />
                </div>
            </div>
            <div className={styles.formActions}>
                {isEdit ? < button className={styles.formSubmitBtn} type="submit">
                    Update
                </button> :
                    < button className={styles.formSubmitBtn} type="submit">
                        Submit
                    </button>}
            </div>
        </form >
    );
};

export default EventForm;