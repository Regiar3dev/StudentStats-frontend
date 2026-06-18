import { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { StudentData } from './types';
import './App.css';
import CredentialCard from './CredentialCard';

const BACKOFFICE_URL = 'https://caloi-app.amr-dev.com/privacy';
const WS_URL = 'ws://localhost:8080/ws';

function App(): JSX.Element {
  const [student, setStudent] = useState<StudentData | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    function connect(): void {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = (): void => {
        console.log('WebSocket connected');
      };

      ws.onmessage = (event: MessageEvent): void => {
        try {
          const data: StudentData = JSON.parse(event.data as string);
          setStudent(data);

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            setStudent(null);
          }, 10000);
        } catch (err) {
          console.error('Failed to parse message:', err);
        }
      };

      ws.onclose = (): void => {
        console.log('WebSocket disconnected, reconnecting...');
        setTimeout(connect, 3000);
      };

      ws.onerror = (err: Event): void => {
        console.error('WebSocket error:', err);
        ws.close();
      };
    }

    connect();

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudent({
        fullName: 'Juan Pérez',
        nextClassDateTime: '2025-06-05 10:00',
        nextClassRoom: '301',
        nextExamDate: '2025-06-12',
        pendingPayments: '$1,500',
      });

      timeoutRef.current = setTimeout(() => {
        setStudent(null);
      }, 10000); 
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="app">
      <header className="header">
        <h1>Cuatro Vientos</h1>
      </header>

      <main className="main">
        <div className="left-section">
        {student ? (
          <CredentialCard student={student} />
          ) : (
            <p className="scan-message">Escanea tu credencial aquí</p>
          )}
        </div>

        <div className="right-section">
          <QRCodeSVG value={BACKOFFICE_URL} size={200} />
        </div>
      </main>
    </div>
  );
}

export default App;
