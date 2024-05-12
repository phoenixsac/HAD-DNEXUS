from flask import Flask, request, jsonify
from transformers import pipeline
from flask import Flask, request, jsonify
import io
import os
from pydub import AudioSegment
from google.cloud import speech_v1p1beta1 as speech



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


@app.route('/transcribe', methods=['POST'])
def transcribe_endpoint():
    # Check if the file is included in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'})

    file = request.files['file']

    # Check if the file is empty
    if file.filename == '':
        return jsonify({'error': 'Empty file provided'})

    # Save the file temporarily
    input_file = 'temp_audio.wav'
    file.save(input_file)

    # Convert and transcribe
    try:
        transcribed_text = convert_and_transcribe(input_file)
    except Exception as e:
        return jsonify({'error': str(e)})

    # Remove the temporary file
    os.remove(input_file)

    return jsonify({'transcription': transcribed_text})


def convert_and_transcribe(input_file):
    # Load the WAV audio file
    audio = AudioSegment.from_wav(input_file)

    # Resample to 16 kHz sample rate
    audio = audio.set_frame_rate(16000)

    # Export the audio with the new sample rate
    output_file = 'output_audio_16000hz.wav'
    audio.export(output_file, format="wav")

    # Read the WAV audio file
    with io.open(output_file, "rb") as audio_file:
        content = audio_file.read()

    # Initialize Speech-to-Text client
    os.environ[
        "GOOGLE_APPLICATION_CREDENTIALS"] = "concise-hue-414010-0ca7d551bc7f.json"  # Replace with your service account key file path
    client = speech.SpeechClient()

    # Specify audio file type and sample rate hertz
    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-US",
    )

    # Perform the transcription
    response = client.recognize(config=config, audio=audio)

    # Extract transcription
    transcribed_text = ""
    for result in response.results:
        transcribed_text += result.alternatives[0].transcript.title() + " "

    # Clean up temporary WAV file
    os.remove(output_file)

    return transcribed_text


if __name__ == '__main__':
    app.run(debug=True)


