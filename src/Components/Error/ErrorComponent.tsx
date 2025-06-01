import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import * as React from "react";
import { isNullOrUndefined } from "../../Helpers/Guard.ts";
import { ValidationMessage } from "../../ClientApi";

const ErrorComponent = ({ messages, onClose }: { messages: ValidationMessage[] | undefined; onClose: () => void }) => {
  const [open, setOpen] = React.useState(true);

  if (isNullOrUndefined(messages)) {
    return null;
  }

  const getValidationMessages = () => {
    return messages.map((message) => {
      return (
        <Collapse style={{ position: "absolute" }} in={open || !isNullOrUndefined(message)}>
          <Alert
            severity={message.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  onClose();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2, whiteSpace: "pre-line" }}
          >
            <span key={message.message}>
              {message.message}
              <br />
            </span>
          </Alert>
        </Collapse>
      );
    });
  };

  return getValidationMessages();
};

export default ErrorComponent;
