from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['POST'])
def post_data():
    try:
        data = request.json.get('data', [])

        if not isinstance(data, list):
            return jsonify({
                'is_success': False,
                'error': 'Invalid data format'
            }), 400

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_alphabet = [max(alphabets, key=lambda x: x.upper(), default='')] if alphabets else []

        response = {
            'is_success': True,
            'user_id': 'ARUN_17091999',
            'email': 'john@xyz.com',
            'roll_number': 'ABCD123',
            'numbers': numbers,
            'alphabets': alphabets,
            'highest_alphabet': highest_alphabet
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({
            'is_success': False,
            'error': str(e)
        }), 500

@app.route('/bfhl', methods=['GET'])
def get_data():
    return jsonify({
        'operation_code': 1
    })

if __name__ == '__main__':
    app.run(debug=True)
