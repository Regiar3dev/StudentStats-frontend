import type { ScreenPayload } from './types';

interface CredentialCardProps {
  student: ScreenPayload;
}

function CredentialCard({ student }: CredentialCardProps): JSX.Element {
  return (
    <div className="credential-card">
      <h2 className="student-name">{student.student_name}</h2>
      <div className="credential-info">
        <div className="info-row">
          <span className="label">Próxima Clase:</span>
          <span className="value">
            {student.next_class.hora} — {student.next_class.lugar}
          </span>
        </div>
        <div className="info-row">
          <span className="label">Próximo Examen:</span>
          <span className="value">{student.next_exam.materia} - {student.next_exam.fecha}</span>
        </div>
        <div className="info-row">
          <span className="label">Pagos Pendientes:</span>
          <span className="value pending">{student.pending_payments_amount}</span>
        </div>
      </div>
    </div>
  );
}

export default CredentialCard;

