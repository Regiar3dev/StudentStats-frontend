# StudentStats - Frontend

Main repository for the frontend webapp of the StudentStats project.

This webapp is meant to be used by students through an RFID interface to view their next classes, their attendance, nearest exam and pending payments.

This simple app is built using React + Vite and Typescript.
It relies on a simple websocket connection to the backend to receive updates on the student's data in real time.

RFID Read is Handled separately, through a python script meant to be run on the Raspberry Pi/Machine that will host the display for the frontend.
