import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPutCurrentUser } from "../../redux/actions";

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
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 600 }}>
      <h3 className="my-3">Profilo</h3>
      <Form onSubmit={handleProfileSubmit}>
        <Form.Group controlId="formRole" className="mb-3">
          <Form.Label>Ruolo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo ruolo"
            name="role"
            value={formData.role}
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </Form.Group>
        <Form.Group controlId="formSurname" className="mb-3">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il tuo cognome"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci la tua email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </Form.Group>

        {!isEditing ? (
          <div className="text-end">
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Modifica Profilo
            </Button>
          </div>
        ) : (
          <>
            <div className="text-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => {
                  setIsEditing(false);
                  setIsChangingPassword(false);
                }}
              >
                Annulla
              </Button>
              <Button variant="primary" type="submit">
                Salva Modifiche
              </Button>
            </div>
          </>
        )}
      </Form>
      {isEditing && (
        <>
          <hr />
          <Button
            variant="info"
            onClick={() => setIsChangingPassword(!isChangingPassword)}
          >
            {isChangingPassword
              ? "Annulla Modifica Password"
              : "Modifica Password"}
          </Button>
          {isChangingPassword && (
            <Form onSubmit={handlePasswordSubmit} className="mt-3 ">
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Nuova Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Inserisci una nuova password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Cambia Password
              </Button>
            </Form>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
