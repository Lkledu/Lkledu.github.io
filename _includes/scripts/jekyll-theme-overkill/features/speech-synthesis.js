{% raw %}
const speechSynthesisModule = (((window, document) => {
  if (typeof window.speechSynthesis === 'undefined') {
    console.warn('Speech synthesis not supported by this browser.');
    return false;
  }


  /**
   * Update voice list value
   */

  const loadVoices = () => {

    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
      console.warn('No speech synthesis language detected on your device.');
    } else {
      const langs = voices.map(voice => voice.lang).filter((value, index, self) => self.indexOf(value) === index);
      if (pageLang && !langs.includes(pageLang)) {
        // if page lang is not available (e.g."en"), use the closest voice lang (e.g. "en-US")
        for (const lang of langs) {
          if (pageLang === lang.replace(/-[a-zA-Z]+$/, '')) {
            pageLang = lang;
          }
        }
      }
      if (pageLang && !langs.includes(pageLang)) {
        console.warn(`Speech synthesis language "${pageLang}" is not installed on your device`);
        console.log('Speech synthesis available languages', langs);
      }
      if (voiceInput) {
        populateVoiceList(pageLang);
      }
      if (langInput) {
        langInput.innerHTML = pageLang;
      }
    }

  };



  /**
   * Populate the language select input
   */

  const populateVoiceList = lang => {

    voiceInput.innerHTML = '';

    let option, selected;

    for (const voice of voices) {
      if (!lang || lang === voice.lang) {

        option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        if (voice.default) {
          option.textContent += ' -- DEFAULT';
        }
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        option.value = voice.name;
        if (!selected) {
          option.setAttribute('selected', 'selected');
          selected = true;
        }

        voiceInput.appendChild(option);
      }
    }
  };



  const voiceInput = document.querySelector('#speech-synthesis-voice');
  const pitchInput = document.querySelector('#speech-synthesis-pitch');
  const rateInput = document.querySelector('#speech-synthesis-rate');
  const volumeInput = document.querySelector('#speech-synthesis-volume');
  //const playButtons = document.querySelectorAll('.speech-synthesis');
  const langInput = document.querySelector('#speech-synthesis-lang');
  const pageLang = $('html').attr('lang');

  let voices = [];

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance('-'));
  } else {
    loadVoices();
  }



  /**
   * Start speech synthesis
   */

  const speak = (text, options) => {

    const utterThis = new SpeechSynthesisUtterance();

    if (text) {
      utterThis.text = text;
    } /*else {
      utterThis.text = this.textContent;
    }*/

    if (options.lang) {
      utterThis.lang = options.lang;
    }

    // Use selected voice (if lang match)
    if (voiceInput && voiceInput.value) {
      const voice = voices.filter(voice => voice.name == voiceInput.value)[0];
      if (!options.lang || voice.lang === options.lang) {
        utterThis.voice = voice;
      }
    } else if (options.lang) {
      // Use the first available voice matchin lang
      utterThis.voice = voices.filter(voice => voice.lang == options.lang)[0];
    }

    //utterThis.voiceURI = 'native';
    if (pitchInput) {
      utterThis.pitch = parseFloat(pitchInput.value); //0 to 2
    }
    if (rateInput) {
      utterThis.rate = parseFloat(rateInput.value); // 0.1 to 10
    }
    if (volumeInput) {
      utterThis.volume = parseFloat(volumeInput.value); // 0 to 1
    }

    utterThis.onend = e => {
      //console.log('Speech synthesis Finished in ' + event.elapsedTime + ' seconds.');
    };

    window.speechSynthesis.speak(utterThis);

  };



  /**
   * Start speech synthesis when user click button
   */

  const addEventListener = (selector, event) => {

    const elements = document.querySelectorAll(selector);

    for (const el of elements) {
      el.addEventListener((event || 'click'), (e) => {
        e.preventDefault();

        const text = e.currentTarget.getAttribute('data-speech-synthesis-text');
        const lang = e.currentTarget.getAttribute('data-speech-synthesis-lang');
        const targetSelector = e.currentTarget.getAttribute('data-speech-synthesis-target');

        if (targetSelector) {
          const target = document.querySelector(targetSelector);
          if (target) {
            text = target.textContent || target.value;
          }
        }

        speak(text, {
          lang
        });

      });
    }

  };


  // Initialize click event on buttons
  addEventListener('.speech-synthesis-test', 'click');


  return {
    populateVoiceList,
    addEventListener
  }
}))(window, document);
{% endraw %}
