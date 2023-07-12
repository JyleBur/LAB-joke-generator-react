import { useState } from 'react';
import getJoke from '../api/jokeData';

function Home() {
  const [setup, setupJoke] = useState('');
  const [deliveryJoke, setUpDeliveryJoke] = useState('');
  const [showDelivery, setShowDelivery] = useState(false);
  const [buttonText, setNewButtonText] = useState('Get a Joke');

  const changeText = (text) => setNewButtonText(text);

  const handleSetupJoke = async () => {
    try {
      const jokeData = await getJoke();
      setupJoke(jokeData.setup);
      setUpDeliveryJoke(jokeData.delivery);
    } catch (error) {
      console.warn('Failed to retrieve a joke :( how unfunny', error);
    }
  };

  const showDeliveryFunction = () => {
    setShowDelivery(true);
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <div id="container">
        <button
          type="button"
          onClick={() => {
            handleSetupJoke();
            changeText('Get a new Joke');
          }}
        >
          {buttonText}
        </button>
        {setup && <p>{setup}</p>}
        {deliveryJoke && <button type="button" onClick={showDeliveryFunction}>Show Punchline</button> }
        {deliveryJoke && showDelivery && <p>{deliveryJoke}</p>}
      </div>
    </div>
  );
}

export default Home;
