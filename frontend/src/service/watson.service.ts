import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

const apiKey = ''; // TODO: pegar do env ou alterar a parte da requisição para a api (problema com o CORS)

export function textToSpeech(text: string) {
  const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: apiKey
    }),
    url: 'https://stream.watsonplatform.net/text-to-speech/api/'
  });

  const params = {
    text: text,
    voice: 'en-US_AllisonVoice',
    accept: 'audio/ogg'
  }

  textToSpeech
    .synthesize(params)
    .then(resp => {
      console.log(resp);
      
      const audio = resp.result;      
    })
}
