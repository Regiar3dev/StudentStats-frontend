import type { StudentData } from './types';

interface CredentialCardProps {
  student: StudentData;
}

function CredentialCard({ student }: CredentialCardProps): JSX.Element {
  return (
    <div className="credential-card">
      <h2 className="student-name">{student.fullName}</h2>
      <div className="credential-info">
        <div className="info-row">
          <span className="label">Próxima Clase:</span>
          <span className="value">
            {student.nextClassDateTime} — Aula {student.nextClassRoom}
          </span>
        </div>
        <div className="info-row">
          <span className="label">Próximo Examen:</span>
          <span className="value">{student.nextExamDate}</span>
        </div>
        <div className="info-row">
          <span className="label">Pagos Pendientes:</span>
          <span className="value pending">{student.pendingPayments}</span>
        </div>
      </div>
    </div>
  );
}

export default CredentialCard;

