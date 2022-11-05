import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function ClientInfo({ email, name, phone }: any) {
  if (!email || !name || !phone) return <p>Client Info missing</p>;

  return (
    <>
      <List>
        <ListItem>
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary={email} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LocalPhoneIcon />
          </ListItemIcon>
          <ListItemText primary={phone} />
        </ListItem>
      </List>
    </>
  );
}
