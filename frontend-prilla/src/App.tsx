import React, {useEffect, useState} from 'react';
import './App.css';
import axios, {AxiosResponse} from 'axios';
import { AcceptGDPR } from './components/AcceptGDPR';
import { Register } from './components/Register';

interface GDPRComponentState {
    alreadyRegistered: boolean;
    alreadyAcceptedGDPR: boolean;
}

interface AppProps {
    qrCode: any; //VAFAN ER TYPEN HER?
}


const initState: GDPRComponentState = {alreadyRegistered : false, alreadyAcceptedGDPR: false};


function App ({qrCode}: AppProps) {
    const [gdprState, setGDPRState] = useState<GDPRComponentState>(initState);
    const [isLoading, setIsLoanding] = useState(true);
    const [hasAcceptedGDPR, setHasAcceptedGDPR] = useState(false);

    const postDataQRCodeData = async (qrCode: any) => {
        try {
            const response: AxiosResponse<GDPRComponentState> =  await axios.post('/prilla/deltager', qrCode);
            setGDPRState(response.data);
            setIsLoanding(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    const submitRegister = async (qrCode: any) => {
        try {
            await axios.post('/prilla/deltager/registrer', qrCode);
        }
        catch (e) {
            console.log(e);
        }
    };

    useEffect(()=> {postDataQRCodeData(qrCode)}, [qrCode]);

    if(isLoading){
        return <div/> //TODO SPINNER??
    }

    if(gdprState.alreadyRegistered) {
        return <div><h1>Deltakkeren er alrede registrert!</h1></div>;
    }

    //KAN MAN VARA REGISTRERT OG IKKE ACCEPTERT GDPR??? I SÅFALL MER LOGIKK HER DÅ

    return (
        <div className="App">
            {hasAcceptedGDPR ?
                <AcceptGDPR acceptGDPR={() => setHasAcceptedGDPR(true)}/>
                : <Register submitRegister={()=> submitRegister(qrCode)}/>}
        </div>
    );
}

export default App;
