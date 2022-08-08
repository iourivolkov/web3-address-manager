import Ethereum from "../assets/images/Ethereum.png";
import Solana from "../assets/images/Solana.png";
import avax from "../assets/images/avax.jpeg";
import { useState } from "react";
import DeleteAddressModal from "./Modals/DeleteAddressModal";
import UpdateAddressModal from "./Modals/UpdateAddressModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
  OutlinedInput,
} from "@mui/material";

const AddressCard = ({
  name,
  walletAddress,
  chain,
  id,
  setAddresses,
  walletAddresses,
}) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  // used for the copy to clipboard feature
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        border: "0.5px solid grey",
        width: 400,
        maxWidth: 700,
        marginTop: "5em",
        borderRadius: "0",
      }}
    >
      <CardMedia
        component="img"
        height="120"
        image={
          (chain === "Ethereum" && Ethereum) ||
          (chain === "Solana" && Solana) ||
          (chain === "Avalanche" && avax)
        }
        alt="chain banner"
      />
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
          >
            {name}
          </Typography>
          <OutlinedInput type="text" value={walletAddress}></OutlinedInput>
          <CopyToClipboard text={walletAddress} onCopy={onCopyText}>
            <Button>
              <ContentCopyIcon />
            </Button>
          </CopyToClipboard>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setIsEditModal(true);
            }}
            disableElevation
            disableRipple
            size="medium"
            variant="contained"
            sx={{ bgcolor: "#536DFE", borderRadius: "0" }}
          >
            <EditIcon />
          </Button>
          <Button
            onClick={() => {
              setIsDeleteModal(true);
            }}
            disableElevation
            disableRipple
            size="medium"
            variant="contained"
            sx={{ bgcolor: "#D32F2F", borderRadius: "0" }}
          >
            <DeleteIcon />
          </Button>
        </CardActions>
        {isEditModal && (
          <UpdateAddressModal
            id={id}
            walletAddresses={walletAddresses}
            walletAddress={walletAddress}
            isEditModal={isEditModal}
            setIsEditModal={setIsEditModal}
          />
        )}
        {isDeleteModal && (
          <DeleteAddressModal
            id={id}
            walletAddresses={walletAddresses}
            setAddresses={setAddresses}
            walletAddress={walletAddress}
            isDeleteModal={isDeleteModal}
            setIsDeleteModal={setIsDeleteModal}
          />
        )}
      </Stack>
    </Card>
  );
};

export default AddressCard;
