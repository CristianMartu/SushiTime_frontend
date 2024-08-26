import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPutCurrentUser } from "../../redux/actions";
import { Box, Button, Divider, FormControl, Typography } from "@mui/material";
import { StyledTextField } from "../../style/style";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    surname: currentUser?.surname || "",
    email: currentUser?.email || "",
    role: currentUser?.role || "",
  });

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchPutCurrentUser(formData));
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const payload = { password: password };
    dispatch(fetchPutCurrentUser(payload));
    setIsChangingPassword(false);
    setPassword("");
    setIsEditing(false);
  };

  return (
    <Box
      height={"calc(100vh - 4rem)"}
      overflow={"auto"}
      maxWidth={"600px"}
      marginInline={"auto"}
    >
      <Typography variant="h3" color={"secondary"} marginBlock={2}>
        Profilo
      </Typography>
      <Box component="form" onSubmit={handleProfileSubmit} sx={{ mt: 2 }}>
        <FormControl fullWidth margin="normal">
          <StyledTextField
            color="secondary"
            id="formRole"
            type="text"
            name="role"
            label="Ruolo"
            value={formData.role}
            placeholder="Inserisci il tuo ruolo"
            InputLabelProps={{ shrink: true }}
            disabled
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <StyledTextField
            id="formName"
            type="text"
            name="name"
            label="Nome"
            value={formData.name}
            onChange={handleChange}
            placeholder="Inserisci il tuo nome"
            InputLabelProps={{ shrink: true }}
            isEditing={isEditing}
            disabled={!isEditing}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <StyledTextField
            id="formSurname"
            type="text"
            name="surname"
            label="Cognome"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Inserisci il tuo cognome"
            InputLabelProps={{ shrink: true }}
            isEditing={isEditing}
            disabled={!isEditing}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <StyledTextField
            id="formEmail"
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Inserisci la tua email"
            InputLabelProps={{ shrink: true }}
            isEditing={isEditing}
            disabled={!isEditing}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </FormControl>
        <Box textAlign="right" mt={2}>
          {!isEditing ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsEditing(true)}
            >
              <Typography>Modifica Profilo</Typography>
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setIsEditing(false);
                  setIsChangingPassword(false);
                }}
                sx={{ mr: 2 }}
              >
                <Typography>Annulla</Typography>
              </Button>
              <Button variant="contained" color="secondary" type="submit">
                <Typography>Salva Modifiche</Typography>
              </Button>
            </>
          )}
        </Box>
      </Box>
      {isEditing && (
        <>
          <Divider sx={{ my: 3 }} />
          <Button
            variant="contained"
            color="error"
            onClick={() => setIsChangingPassword(!isChangingPassword)}
          >
            <Typography>
              {isChangingPassword
                ? "Annulla Modifica Password"
                : "Modifica Password"}
            </Typography>
          </Button>
          {isChangingPassword && (
            <Box component="form" onSubmit={handlePasswordSubmit} mt={3}>
              <FormControl fullWidth margin="normal">
                <StyledTextField
                  id="formPassword"
                  type="password"
                  label="Nuova Password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Inserisci una nuova password"
                  isEditing={isEditing}
                  required
                />
              </FormControl>
              <Button variant="contained" type="submit" color="secondary">
                <Typography>Cambia Password</Typography>
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Profile;
