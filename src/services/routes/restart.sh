#!/bin/bash

SERVER_PORT=3000

stop_server() {
  echo "Parando o servidor..."
  fuser -k $SERVER_PORT/tcp
}

start_server() {
  echo "Iniciando o servidor..."
  nohup yarn dev
}

restart_server() {
  stop_server
  sleep 2 
  start_server
  echo "Servidor reiniciado com sucesso!"
}

restart_server
