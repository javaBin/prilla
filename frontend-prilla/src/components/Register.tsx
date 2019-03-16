import React from "react";

interface RegisterProps {
    submitRegister: () => void;
}

export function Register ({submitRegister}: RegisterProps) {
    return (
        <div>
            <h1>Register h1</h1>
            <p>kanske noen tekst her</p>
            <button onClick={submitRegister}>Register</button>
        </div>

    )
}
