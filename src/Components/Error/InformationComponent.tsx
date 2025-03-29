import React, {ReactNode} from "react";
import { useSelector, useDispatch } from "react-redux";
import {clearBubble, InfoObjectType} from "./ErrorSlice.ts";
import {RootState} from "../../store.ts";
import {Alert} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import {MessageType, MessageTypeObject} from "../../../generated-client/models";

const InformationComponent: React.FC = () => {
    const dispatch = useDispatch();
    const errorState = useSelector((state: RootState) => state.error).messages;

    if (!errorState) return null;

    const getIcon = (messageType: MessageType): ReactNode => {
        switch(messageType) {
            case MessageTypeObject.ErrorEscaped:
                return <ErrorIcon fontSize="inherit" />;
            case MessageTypeObject.Warning:
                return <WarningIcon fontSize="inherit" />;
            case MessageTypeObject.Info:
                return <InfoIcon fontSize="inherit" />;
            case MessageTypeObject.Success:
                return <CheckIcon fontSize="inherit" />;
        }

        return null;
    }

    const groupedMessages = errorState.reduce<Record<string, InfoObjectType[]>>((acc, message) => {
        const { type } = message;

        if (type && !acc[type]) {
            acc[type] = [];
        }

        if (type) {
            acc[type].push(message);
        }

        return acc;
    }, {});
    const bubbles: ReactNode[] = [];
    Object.entries(groupedMessages).forEach(([type, messages]) => {
        const bubble = <Alert
            sx={{ whiteSpace: 'pre-line', alignSelf: "right", alignContent: 'left', position: 'absolute' }}
            icon={getIcon(type as MessageType)}
            severity={type as MessageType}
            onClick={() => dispatch(clearBubble(type as MessageType))}>
            {messages.map((infoObject) => infoObject.message + "\r\n")}
        </Alert>;
        bubbles.push(bubble);
    });

    return <div>
        {...bubbles}
    </div>;
};

export default InformationComponent;
