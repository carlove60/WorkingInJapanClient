import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import * as React from "react";
import { isNullOrUndefined } from "../../Helpers/Guard.ts";

const ErrorComponent = ({ value, onClose }: { value: string[] | undefined; onClose: () => void }) => {
  const [open, setOpen] = React.useState(true);

  if (isNullOrUndefined(value)) {
    return null;
  }

  return (
    // Instead of using an effect this saves a re-render
    <Collapse style={{ position: "absolute" }} in={open || !isNullOrUndefined(value)}>
      <Alert
        severity="error"
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
        {value.map((message) => (
          <span key={message}>
            {message}
            <br />
          </span>
        ))}
      </Alert>
    </Collapse>
  );
};

export default ErrorComponent;
