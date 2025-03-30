import React, {ReactNode} from "react";
import { useSelector, useDispatch } from "react-redux";
import {clearBubble} from "./BubbleSlice.ts";
import {RootState} from "../../store.ts";
import {Alert} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import {MessageType, MessageTypeObject} from "../../../generated-api/models";
import {groupMessages} from "../../Helpers/BubbleHelper.ts";

const BubbleComponent: React.FC = () => {
    const dispatch = useDispatch();
    const errorState = useSelector((state: RootState) => state.error);
    const messages = errorState?.messages;

    if (!messages) return null;

    const getIcon = (messageType: MessageType) => {
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
    const groupedMessages = groupMessages(messages);
    if (!groupedMessages)
    {
        return null;
    }
    const bubbles: ReactNode[] = [];
    Object.entries(groupedMessages).forEach(([type, messages]) => {
        const bubble = <Alert
            sx={{ whiteSpace: 'pre-line', alignSelf: "right", alignContent: 'left', position: 'absolute' }}
            icon={getIcon(type as MessageType)}
            severity={type as MessageType}
            onClose={() => dispatch(clearBubble(type as MessageType))}>
            {messages.map((infoObject) => infoObject.message + "\r\n")}
        </Alert>;
        bubbles.push(bubble);
    });

    return  <div>{...bubbles}</div>;
}

export default BubbleComponent;
