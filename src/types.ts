export interface NextClass {
  lugar: string;
  hora: string;
}

export interface NextExam {
  materia: string;
  fecha: string;
}

export interface ScreenPayload {
  status: "success" | "error" | string; // Permite strings genéricos o literales específicos
  student_id: number;
  student_name: string;
  next_class: NextClass;
  next_exam: NextExam;
  pending_payments_amount: number;
}

