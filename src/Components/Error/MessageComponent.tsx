import { Alert, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import { isNullOrUndefined } from "../../Helpers/Guard/Guard.ts";
import { MessageType, ValidationMessage } from "../../ClientApi";

const MessageComponent = ({ messages }: { messages: ValidationMessage[] | undefined }) => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    if (!isNullOrUndefined(messages) && messages.length > 0) {
      // Reset open to true whenever new messages arrive
      setOpen(true);
    }
  }, [messages]);

  const handleClose = () => {
    setOpen(false);
  };

  const hasMessages = !isNullOrUndefined(messages) && messages.length > 0;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 64,
        mb: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Collapse in={open && hasMessages}>
        {messages?.map((message) => (
          <Collapse in={open || !isNullOrUndefined(message)} key={message.message}>
            <Alert
              severity={message.type.toLowerCase() as MessageType}
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ whiteSpace: "pre-line" }}
            >
              {message.message}
            </Alert>
          </Collapse>
        ))}
      </Collapse>
    </Box>
  );
};

export default MessageComponent;
