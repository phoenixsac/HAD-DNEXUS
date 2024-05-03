from flask import Flask, request, jsonify
from transformers import pipeline

# Initialize Flask app
app = Flask(__name__)

# Load the text summarization pipeline
summarizer = pipeline("summarization")

# Define the summarization endpoint
@app.route('/summarize', methods=['POST'])
def summarize_text():
    # Get the input text from the request
    input_text = request.json.get('text')

    # Generate a summary
    summary = summarizer(input_text, max_length=150, min_length=30, do_sample=False)

    # Extract the summary text
    summary_text = summary[0]['summary_text']

    # Return the summarized text
    return jsonify({'summary': summary_text})

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
