from flask import Flask, request
from dotenv import load_dotenv
import os
import requests
import json
from hashlib import sha256
from flask_cors import CORS

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": os.getenv('CORS_ALLOWED_ORIGIN')}})

port = os.getenv('AUTH_API_PORT')
hasura_secret_key = os.getenv('HASURA_GRAPHQL_ADMIN_SECRET')
hasura_url = os.getenv('GRAPHQL_ENDPOINT')


# GraphQl json query
def create_login_query(email):
    return {
        "query": """query Login($email: String = \"\") {
          az_users_Users(where: {email: {_eq: $email}}) {
            userId
            userRole
            AuthData {
              password
            }
          }
        }""",
        "operationName": "Login",
        "variables": {"email": email}
    }


@app.route('/login', methods=['POST'])
def login():
    hasura_user_password = ""
    hasura_user_id = ""
    hasura_user_role = ""

    # Get user_data and create hash of password for the check
    user_data = request.get_json()
    hash_pass = sha256(user_data['password'].encode('utf-8')).hexdigest()

    # Send request in DB which get password by email
    headers = {'x-hasura-admin-secret': hasura_secret_key, 'Content-Type': 'application/json'}
    url = hasura_url
    response = requests.post(url, json=create_login_query(user_data['email']), headers=headers)
    json_pars = json.loads(response.text)

    data = json_pars['data']
    user_info = data['az_users_Users']

    if not user_info:
        return json.dumps({'status': 'User not found' }), 404
    else:
        for info in user_info:
            hasura_user_password = info['AuthData'][0]['password']
            hasura_user_id = info['userId']
            hasura_user_role = info['userRole']
        if hasura_user_password == hash_pass:
            return {'userId': hasura_user_id, 'userRole': hasura_user_role, 'token': hasura_secret_key}
        else:
            return json.dumps({'status': 'Invalid password provided'}), 401


if __name__ == '__main__':
    from waitress import serve
    serve(app, port=port)
