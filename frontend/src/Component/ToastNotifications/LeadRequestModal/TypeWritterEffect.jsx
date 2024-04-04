import React, { useState, useEffect } from 'react';
import TextSlider from './TextSlider';

const TextTyper = ({ filters }) => {
  const [typedText, setTypedText] = useState('');

  const [randomText, setRandomText] = useState('');

  const [showTextSlider, setShowTextSlider] = useState(false);

  useEffect(() => {
    getRandomText();
  }, []);

  const texts = [
    'Reaching out to database genies to find',
    'Mending time and space to get you',
    'Mixing magical potions to make',
    'Lighting fires in the ice for',
  ];

  const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    setRandomText(texts[randomIndex]);
  };

  const interval = 50;
  const typingRender = (randomText, updater, interval) => {
    let localTypingIndex = 0;
    let localTyping = '';
    if (randomText) {
      let printer = setInterval(() => {
        if (localTypingIndex < randomText.length) {
          updater((localTyping += randomText[localTypingIndex]));
          localTypingIndex += 1;
        } else {
          localTypingIndex = 0;
          localTyping = '';
          clearInterval(printer);
          setShowTextSlider(true);
        }
      }, interval);
    }
  };

  useEffect(() => {
    typingRender(randomText, setTypedText, interval);
  }, [randomText, interval]);

  return (
    <>
      <span
        style={{
          textAlign: 'center',
          fontFamily: 'sans-serif',
          fontSize: '45px',
          fontWeight: 550,
          lineHeight: '101.713%',
          color: '#1E1E1E',
          fontStyle: 'normal',
          maxWidth: '100%',
          marginTop: '60px',
        }}
      >
        {typedText}
      </span>
      {showTextSlider && <TextSlider filters={filters} />}
    </>
  );
};

export default TextTyper;
