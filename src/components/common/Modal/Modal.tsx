import React from "react";
import { Modal as ModalMui, Box, Typography } from "@mui/material";
import { ModalProps } from "./Modal.types";

const Modal: React.FC<ModalProps> = ({
  open,
  close,
  children,
  title,
  maxWidth,
}) => {
  return (
    <ModalMui
      open={open}
      onClose={close}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 400,
          bgcolor: "background.paper",
          border: "2px solid #777",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxWidth,
        }}
      >
        {title && (
          <Typography
            id="modal-title"
            variant="h3"
            style={{ textAlign: "center" }}
            component="h1"
          >
            {title}
          </Typography>
        )}
        <Box id="modal-description" sx={{ mt: title ? "1.5rem" : "0" }}>
          {children}
        </Box>
      </Box>
    </ModalMui>
  );
};

export default Modal;
