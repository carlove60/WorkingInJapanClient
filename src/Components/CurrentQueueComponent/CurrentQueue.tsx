import { PartyDto } from "../../ClientApi";
import { isNullOrUndefined } from "../../Helpers/Guard.ts";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  parties: PartyDto[] | undefined;
}

const CurrentQueue = ({ parties }: Props): React.ReactElement | null => {
  if (isNullOrUndefined(parties) || parties.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Waiting Queue
      </Typography>
      {parties.length === 0 ? (
        <Typography>No parties in the queue.</Typography>
      ) : (
        parties.map((party) => (
          <div>
            {party.name} ({party.size}
          </div>
        ))
      )}
    </Box>
  );
};

export default CurrentQueue;
