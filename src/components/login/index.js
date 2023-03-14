import { useState } from "react";
import clsx from "clsx";
import styles from "../../LoginForm.module.css";
import { useLoginFormValidator } from "../../hooks/useLoginFormValidator";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginForm = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [isUserRegisterd, setIsUserRegisterd] = useState(false);
    const { users } = useSelector(state => state.user)

    const navigate = useNavigate();
    const { errors, validateForm, checkUserExists } = useLoginFormValidator(form);


    const onSubmitForm = e => {
        e.preventDefault();
        setIsUserRegisterd(false);
        const { isValid } = validateForm([
            { field: "email", value: form.email },
            { field: "password", value: form.password }
        ]);

        if (!isValid) return;
        const isUserExists = checkUserExists(form.email, form.password);
        const userData = JSON.stringify({
            email: form.email,
            userName: users?.find(item => item.email === form.email)?.userName
        })

        window.localStorage.setItem("user", userData)

        if (!isUserExists) {
            setIsUserRegisterd(true);
            return;
        }

        navigate("/event")
    };

    return (
        <form className={styles.form} onSubmit={onSubmitForm}>
            {isUserRegisterd ? (
                <p className={styles.formFieldErrorMessage}>
                    User is not registerd. Please register now.
                </p>
            ) : null}
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
                    Login
                </button>
                <div>Not registerd yet? <Link to="/register">Register Now</Link></div>
            </div>
        </form>
    );
};

export default LoginForm;