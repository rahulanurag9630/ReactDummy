import React from "react";
import Typography from "@material-ui/core/Typography";

const MAX_DESCRIPTION_LENGTH = 175;

const TruncatedDescription = ({ description }) => {
  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH
      ? description.substring(0, MAX_DESCRIPTION_LENGTH).trim() + "..."
      : description;

  return (
    <Typography
      variant="body1"
      dangerouslySetInnerHTML={{ __html: truncatedDescription }}
    />
  );
};

export default TruncatedDescription;
