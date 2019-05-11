import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import { AcceptGDPR } from './components/AcceptGDPR';
import { Register } from './components/Register';
import {FetchInitialData} from './components/DataFetcher';

export interface DeltagerData {
    alreadyRegistered: boolean;
    alreadyAcceptedGDPR: boolean;
}

export interface SpeakerData {
    alreadyAcceptedGDPR: boolean;
    hasReceivedGift: boolean;
}

interface AppProps {
    qrCode: any; //VAFAN LIGGER I QRKODEN?
}

export type ParticipantType = 'DELTAGER' | 'SPEAKER' ;


function App ({qrCode}: AppProps) {
    const [hasAcceptedGDPR, setHasAcceptedGDPR] = useState(false);


    const submitRegister = async (qrCode: any) => {
        try {
            await axios.post('/prilla/deltager/register', qrCode);
        }
        catch (e) {
            console.log(e);
        }
    };

    return (
        <FetchInitialData
            participantType='DELTAGER' // cast data beroende på participantType
            qrCode={qrCode}
            render={(data) => {
                if((data as DeltagerData).alreadyRegistered || (data as SpeakerData).hasReceivedGift) {
                    return <div><h1>Deltakkeren er alrede registrert!</h1></div>;
                }
                return (
                    <div className="App">
                        {hasAcceptedGDPR ?
                             <Register submitRegister={()=> submitRegister(qrCode)}/>
                            :  <AcceptGDPR acceptGDPR={() => setHasAcceptedGDPR(true)}/>

                        }
                    </div>
                );
            }}

        />
    );

}

export default App;
