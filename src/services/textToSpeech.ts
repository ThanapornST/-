import axios from 'axios';

const API_KEY = 'AIzaSyCZ4GECnSPbxDIpNayZXVPE5R8XrOMDeZY';
const API_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';

interface SynthesizeRequest {
  input: {
    text: string;
  };
  voice: {
    languageCode: string;
    name: string;
  };
  audioConfig: {
    audioEncoding: string;
    pitch?: number;
    speakingRate?: number;
  };
}

export const synthesizeSpeech = async (text: string, voice = 'th-TH-Standard-A') => {
  try {
    const request: SynthesizeRequest = {
      input: { text },
      voice: {
        languageCode: 'th-TH', // Thai language code
        name: voice,
      },
      audioConfig: {
        audioEncoding: 'MP3',
        pitch: 0,
        speakingRate: 1,
      },
    };

    const response = await axios.post(
      `${API_ENDPOINT}?key=${API_KEY}`,
      request
    );

    return response.data.audioContent;
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error;
  }
};