import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';

const SignupPage = () => {
    const { showPass, setShowPass } = useState(false);
    const { formData, setFormData } = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const { signup, isSigningUp } = useAuthStore();
    const validateForm = () => { }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        <div>
            SignupPage
        </div>
    )
}

export default SignupPage
