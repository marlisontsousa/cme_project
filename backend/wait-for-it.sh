#!/usr/bin/env bash
host="$1"
shift
cmd="$@"

until nc -z "$host" 5432; do
  >&2 echo "Banco não está pronto — aguardando..."
  sleep 1
done

>&2 echo "Banco está pronto — iniciando aplicação"
exec $cmd
