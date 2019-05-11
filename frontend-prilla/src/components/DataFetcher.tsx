import axios from "axios";
import React, {useEffect, useState} from 'react';
import {DeltagerData, ParticipantType, SpeakerData} from '../App';

interface DataFetcherProps {
    qrCode: string;
    render: (data: DeltagerData | SpeakerData) => JSX.Element;
    participantType: ParticipantType;
}

type DataFetcherState = DeltagerData | SpeakerData | null;


export function FetchInitialData({qrCode, render, participantType}: DataFetcherProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<DataFetcherState>(null);

    const postParticipantQRCodeData = async (qrCode: string) => {
        try {
            const response =  await axios.post('/prilla/deltager', qrCode);
            setData(response.data);
            setIsLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    const postSpeakerQRCodeData = async (qrCode: string) => {
        try {
            const response =  await axios.post('/prilla/speaker', qrCode);
            setData(response.data);
            setIsLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (participantType === 'DELTAGER') {
            postParticipantQRCodeData(qrCode);

        } else {
           postSpeakerQRCodeData(qrCode)
        }
    },[qrCode]);

    if(isLoading) {
        return <div>Fetching data</div>
    }

    if(data) {
        return render(data);
    }

    return null;
}
