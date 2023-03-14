import { useState } from "react";
import { useSelector } from "react-redux";

import {
    emailValidator,
    passwordValidator,
    textFieldValidator,
} from "../validation/index";

export const useLoginFormValidator = () => {
    const { users } = useSelector(state => state.user)
    const { events } = useSelector(state => state.event)
    const [errors, setErrors] = useState({
        email: {
            error: false,
            message: "",
        },
        password: {
            error: false,
            message: "",
        },
        textField: {
            error: false,
            message: ""
        }
    });

    const validateForm = (formData) => {
        let isValid = true;
        let nextErrors = JSON.parse(JSON.stringify(errors));

        formData.forEach(form => {
            if (form.field === "email") {
                const emailMessage = emailValidator(form.value);
                nextErrors.email.error = !!emailMessage;
                nextErrors.email.message = emailMessage;
                if (!!emailMessage) isValid = false;
            } else if (form.field === "password") {
                const passwordMessage = passwordValidator(form.value);
                nextErrors.password.error = !!passwordMessage;
                nextErrors.password.message = passwordMessage;
                if (!!passwordMessage) isValid = false;
            } else if (form.field === "textField") {
                const userMessage = textFieldValidator(form.value);
                nextErrors.textField.error = !!userMessage;
                nextErrors.textField.message = userMessage;
                if (!!userMessage) isValid = false;
            }
        })
        setErrors(nextErrors);

        return {
            isValid,
            errors: nextErrors,
        };
    };

    const checkAlreadyRegistered = (email) => {
        return users.some(item => item.email === email)
    }

    const isAllFildsAdded = (form) => {
        return !!form.eventName && !!form.eventDate && !!form.eventDesc && !!form.acceptTerms && !!form.bookingType && !!form.price
    }

    const checkUserExists = (email, password) => {
        return users.some(item => (item.email === email && item.password === password))
    }

    const isEventAlreadyExists = (form) => {
        return events.some(item => item.eventName === form.eventName)
    }

    return {
        validateForm,
        checkUserExists,
        isAllFildsAdded,
        checkAlreadyRegistered,
        isEventAlreadyExists,
        errors,
    };
};