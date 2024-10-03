import { SendFormData } from './send-form';

export const Inscription = ({
  name,
  email,
  phone,
  session,
  comments,
}: SendFormData) => {
  return (
    <div>
      <h3>Nouvelle inscription à un cours sur Kalink Studio</h3>
      <ul>
        <li>
          <strong>Nom:</strong> {name}
        </li>
        <li>
          <strong>Email:</strong> {email}
        </li>
        <li>
          <strong>Téléphone:</strong> {phone}
        </li>
        <li>
          <strong>Session sélectionnée:</strong> {session}
        </li>
      </ul>
      <h3 style={{ marginTop: '32px' }}>Commentaire</h3>
      <p>{comments}</p>
    </div>
  );
};
