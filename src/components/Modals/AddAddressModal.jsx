import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
} from "@mui/material";
import { useState, useContext } from "react";
import AppContext from "../../Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const AddContactModal = ({ isAddModal, setIsAddModal }) => {
  const { walletAddresses, setAddresses } = useContext(AppContext);
  const handleClose = () => setIsAddModal(false);

  const [addressType, setAddressType] = useState("");
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [walletChain, setWalletChain] = useState("");

  const handleAddressType = (e) => {
    setAddressType(e.target.value);
  };

  const handleWalletAddress = (e) => {
    setNewWalletAddress(e.target.value);
    console.log(newWalletAddress);
  };

  const handleWalletChain = (e) => {
    setWalletChain(e.target.value);
  };

  // POST request to add addresses to PBLK database

  const addAddressHandler = async (e) => {
    e.preventDefault();

    const newAddress = {
      name: addressType,
      address: newWalletAddress,
      chain: walletChain,
    };

    const response = await fetch("http://localhost:5001/wallets", {
      method: "POST",
      body: JSON.stringify(newAddress),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setAddresses((prev) => [newAddress, ...prev]);
    setIsAddModal(false);
  };

  return (
    <div>
      <Modal
        open={isAddModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textTransform: "uppercase",
              fontFamily: "Figtree",
              fontWeight: "bold",
            }}
          >
            New Address
          </Typography>
          <br />
          <br />
          <form onSubmit={addAddressHandler}>
            <Stack spacing={3}>
              <TextField
                sx={{
                  fontFamily: "Figtree",
                }}
                type="text"
                label="Address Type"
                type="text"
                onChange={handleAddressType}
                value={addressType}
              />
              <TextField
                sx={{
                  fontFamily: "Figtree",
                }}
                label="Wallet Address"
                type="text"
                onChange={handleWalletAddress}
                value={newWalletAddress}
              />
              <TextField
                sx={{
                  fontFamily: "Figtree",
                }}
                label="Chain"
                type="text"
                onChange={handleWalletChain}
                value={walletChain}
              />
              <Button
                disableElevation
                type="submit"
                disableRipple
                variant="contained"
                size="large"
                sx={{
                  textTransform: "uppercase",
                  color: "white",
                  fontFamily: "Futura",
                  fontWeight: "100",
                  bgcolor: "green",
                  borderRadius: "0",
                }}
              >
                Add Address
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddContactModal;
