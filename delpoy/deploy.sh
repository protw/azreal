#! /bin/bash

set -e
pushd . > /dev/null

# The following lines ensure we run from the root folder of this Starter
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PROJECT_DIR="$( cd "${DIR}/.." > /dev/null 2>&1 && pwd )"
SERVICES_DIR="${PROJECT_DIR}/services"
WEBUI_DIR="${PROJECT_DIR}/ui"
export DOCS_DIR="${PROJECT_DIR}/docs"

PROJECT_NAME=azreal

test_apps(){
  [[ -z "$1" ]] && echo "FATAL: function requires at least 1 argument, but provided 0" && exit 2

  while :; do
    [[ -z "$1" ]] && break

    while ! type "$1" > /dev/null 2> /dev/null; do
      echo "Error: $1 is not installed on your system." >&2
      exit 127
    done

    shift
  done
}

make_caddyfile(){
  [[ ! -f "Caddyfile.template" ]] && echo "Error: Caddyfile.template must be present to continue" && exit 1

  cp Caddyfile.template Caddyfile
  CURRENT_GATEWAY=$(head -n 1 Caddyfile | cut -d ' ' -f 1)

  [[ -n $HTTP_GATEWAY ]] && sed -i "s/$CURRENT_GATEWAY {/$HTTP_GATEWAY {/" Caddyfile
  [[ -n $AUTH_API_PORT ]] && sed -i "s/<auth-api-proxy>/localhost:$AUTH_API_PORT/" Caddyfile
  [[ -n $MONGO_API_PORT ]] && sed -i "s/<mongo-api-proxy>/localhost:$MONGO_API_PORT/" Caddyfile
  [[ -n $DOCSIFY_PORT ]] && sed -i "s/<docs-api-proxy>/localhost:$DOCSIFY_PORT/" Caddyfile
}

pm2_processes(){
  [[ $1 != 'start' ]] && [[ $1 != 'stop' ]] \
    && echo "FATAL: function requires 'start' or 'stop' as an argument" && exit 2

  local processes
  processes=("mongo-api" "auth-api" "airly-fetcher" "web-ui")

  for proc in "${processes[@]}"; do
    pm2 "$1" "$proc" > /dev/null
  done
}

while :; do
  case $1 in
    --down)
      docker-compose -p $PROJECT_NAME down

      pm2_processes stop
      pm2 ls

      exit 0
    ;;
    --renew)
      docker-compose -p $PROJECT_NAME up -d
      docker ps

      pm2_processes start
      pm2 ls

      exit 0
    ;;
    --rebuild-ui)
      REBUILD_UI="true"
    ;;
    -?*)
      printf "WARN: Unknown option (ignored): %s\n" "$1" >&2
      break
    ;;
    *)
      [[ ! -f .env ]] && echo "Error: .env file must be present to continue" && exit 1
      export $(grep -v '#' < .env | awk '/=/ {print $1}')

      test_apps npm yarn python3 pip3 docker docker-compose pm2

      make_caddyfile

      echo "Starting Caddyserver, MongoDB and Hasura GraphQL..."
      docker-compose -p $PROJECT_NAME up -d > /dev/null

      # -------------------------------------------------------------------------------------------

      echo "Fetching dependencies for Python services..."
      cd "$SERVICES_DIR"
      find . -maxdepth 1 -type d \( ! -name . \) -exec \
        bash -c "cd '{}' && sudo pip3 install -r requirements.txt > /dev/null" \;

      echo "Fetching dependencies for Web UI..."
      cd "$WEBUI_DIR"
      yarn install > /dev/null

      # -------------------------------------------------------------------------------------------

      echo "Starting Mongo API..."
      cd "${SERVICES_DIR}/mongo"
      pm2 start mongo.py -n mongo-api --interpreter python3 > /dev/null

      # -------------------------------------------------------------------------------------------

      echo "Starting Auth API..."
      cd "${SERVICES_DIR}/auth"
      pm2 start main.py -n auth-api --interpreter python3 > /dev/null

      # -------------------------------------------------------------------------------------------

      echo "Starting Airly Fetcher..."
      cd "${SERVICES_DIR}/airly-fetcher"
      pm2 start main.py -n airly-fetcher --interpreter python3 \
        --cron "0,30 * * * *" --no-autorestart > /dev/null

      # -------------------------------------------------------------------------------------------

      cd "$WEBUI_DIR"
      if [[ ! -d "${WEBUI_DIR}/.next" ]] || [[ -n $REBUILD_UI ]]; then
        echo "Building Web UI..."
        yarn build
      fi

      echo "Starting Web UI..."
      pm2 start "yarn start" -n web-ui > /dev/null

      # -------------------------------------------------------------------------------------------

      printf "\nPM2 processes status:\n"
      pm2 ls

      printf "\nDocker containers status:\n"
      docker ps
    ;;
  esac
  shift
done

popd > /dev/null
exit 0
