import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {clearBubble} from "./BubbleSlice.ts";
import {RootState} from "../../store.ts";
import {Alert} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import {MessageType, MessageTypeObject} from "../../../generated-api/models";
import {isNullOrUndefined} from "../../Helpers/Guard.ts";

const ErrorComponent = () => {
    const dispatch = useDispatch();
    const errorState = useSelector((state: RootState) => state.error);
    const messages = errorState?.messages;

    if (isNullOrUndefined(messages)) {
        return null;
    }

    const messageSx: React.CSSProperties = { whiteSpace: 'pre-line', alignSelf: "right", alignContent: 'left', position: 'absolute' };

    const getIcon = (messageType: MessageType): React.ReactNode | null => {
        switch(messageType) {
            case MessageTypeObject.ErrorEscaped:
                return <ErrorIcon fontSize="inherit" />;
            case MessageTypeObject.Warning:
                return <WarningIcon fontSize="inherit" />;
            case MessageTypeObject.Info:
                return <InfoIcon fontSize="inherit" />;
            case MessageTypeObject.Success:
                return <CheckIcon fontSize="inherit" />;
            default:
                return null;
        }
    }

    const bubbles =  messages.map((message) : React.ReactNode => {
        const messageType = message.type as MessageType;
        return <Alert
            sx={messageSx}
            icon={getIcon(messageType)}
            severity={messageType}
            onClose={() => dispatch(clearBubble(messageType))}>
            {messages.map((infoObject) => infoObject.message + "\r\n")}
        </Alert>;
    });

    return  <div>{...bubbles}</div>;
}

export default ErrorComponent;
