import React from "react";

interface AcceptGDPRProps {
    acceptGDPR: () => void;
}

export function AcceptGDPR ({acceptGDPR}: AcceptGDPRProps) {
    return (
        <div>
            <h1>H1</h1>
            <p>For att vara med i konkuransen må du acceptere GDPR ting</p>
            <button onClick={acceptGDPR}>Japps</button>
        </div>
    )
}
