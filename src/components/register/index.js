import { useState } from "react";
import clsx from "clsx";
import styles from "../../LoginForm.module.css";
import { useLoginFormValidator } from "../../hooks/useLoginFormValidator";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/registerSlice";

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userExists, setUserExists] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        userName: ""
    });
    const { errors, validateForm, checkAlreadyRegistered } = useLoginFormValidator(form);

    const onSubmitForm = e => {
        e.preventDefault();
        setUserExists(false);
        const { isValid } = validateForm([
            { field: "email", value: form.email },
            { field: "password", value: form.password },
            { field: "textField", value: form.userName }
        ]);
        if (!isValid) return;

        const isUserExists = checkAlreadyRegistered(form.email)
        if (isUserExists) {
            setUserExists(true);
            return
        }
        dispatch(registerUser(form))

        navigate("/")
    };

    return (
        <form className={styles.form} onSubmit={onSubmitForm}>
            {userExists ? (
                <p className={styles.formFieldErrorMessage}>
                    User already exists.
                </p>
            ) : null}
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>User Name</label>
                <input
                    className={clsx(
                        styles.formField,
                        errors.textField.error && styles.formFieldError
                    )}
                    type="text"
                    aria-label="User Name"
                    name="userName"
                    value={form.userName}
                    onChange={(e) => { setForm({ ...form, userName: e.target.value }) }}
                />
                {errors.textField.error ? (
                    <p className={styles.formFieldErrorMessage}>
                        {errors.textField.message}
                    </p>
                ) : null}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input
                    className={clsx(
                        styles.formField,
                        errors.email.error && styles.formFieldError
                    )}
                    type="text"
                    aria-label="Email field"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email.error ? (
                    <p className={styles.formFieldErrorMessage}>{errors.email.message}</p>
                ) : null}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.formLabel}>Password</label>
                <input
                    className={clsx(
                        styles.formField,
                        errors.password.error &&
                        styles.formFieldError
                    )}
                    type="password"
                    aria-label="Password field"
                    name="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                {errors.password.error ? (
                    <p className={styles.formFieldErrorMessage}>
                        {errors.password.message}
                    </p>
                ) : null}
            </div>
            <div className={styles.formActions}>
                <button className={styles.formSubmitBtn} type="submit">
                    Register
                </button>
                <div>Already Registerd? <Link to="/">Sign In</Link></div>
            </div>
        </form>
    );
};

export default RegisterForm;