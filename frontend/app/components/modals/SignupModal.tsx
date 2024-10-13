'use client';

import Modal from "./Modal";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import React from "react";

const SignupModal = () => {


    const router = useRouter();
    const signupModal = useSignupModal();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    // Submit functionality

    // Email and Password validation logic
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const submitSignup = async () => {

        const tmpErrors: string[] = [];

        // Email validation
        if (!validateEmail(email)) {
            tmpErrors.push("Enter a valid email address.");
        }

        // Password validation
        if (!validatePassword(password1)) {
            tmpErrors.push("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
        }

        // Check if passwords match
        if (password1 !== password2) {
            tmpErrors.push("Passwords do not match.");
        }

        // If any validation errors, set errors and do not submit
        if (tmpErrors.length > 0) {
            setErrors(tmpErrors);
            return;
        }

        const formData = {
            email: email,
            password1: password1,
            password2: password2
        };

        const response = await apiService.postWithoutToken('http://localhost:8000/api/auth/register/', JSON.stringify(formData));

        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh);

            signupModal.close();

            router.push('/')
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            })

            setErrors(tmpErrors);
        }
    }

    const content = (
        <>
            <form
                onSubmit={submitSignup}
                className="space-y-4"
            >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

                {errors.map((error, index) => {
                    return (
                        <div
                            key={`error_${index}`}
                            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                    )
                })}

                <CustomButton
                    label="Submit"
                    onClick={submitSignup}
                />
            </form>
        </>
    )

    return (
        <Modal
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label="Sign up"
            content={content}
        />
    )
}

export default SignupModal;