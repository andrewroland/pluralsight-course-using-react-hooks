import speakersReducer from './speakersReducer';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

function useSpeakerDataManager() {
  const [
    { speakerList, isLoading, favoriteClickCount, hasErrored, error },
    dispatch,
  ] = useReducer(speakersReducer, {
    isLoading: true,
    speakerList: [],
    favoriteClickCount: 0,
    hasErrored: false,
    error: null,
  });

  function incrementFavoriteClickCount() {
    dispatch({ type: 'incrementFavoriteClickCount' });
  }

  function toggleSpeakerFavorite(speaker) {
    const updateData = async function () {
      axios.put(`http://localhost:4000/speakers/${speaker.id}`, speaker);
      speaker.favorite === true
        ? dispatch({ type: 'unfavorite', id: speaker.id })
        : dispatch({ type: 'favorite', id: speaker.id });
    };
    updateData();
  }

  useEffect(() => {
    // new Promise(function (resolve) {
    //   setTimeout(function () {
    //     resolve();
    //   }, 1000);
    // }).then(() => {
    //   dispatch({
    //     type: 'setSpeakerList',
    //     data: SpeakerData,
    //   });
    // });
    const fetchData = async function () {
      try {
        let result = await axios.get('http://localhost:4000/speakers');
        dispatch({
          type: 'setSpeakerList',
          data: result.data,
        });
      } catch (e) {
        dispatch({
          type: 'errored',
          error: e,
        });
      }
    };

    fetchData();

    return () => {
      console.log('cleanup');
    };
  }, []); // [speakingSunday, speakingSaturday]);
  return {
    isLoading,
    speakerList,
    favoriteClickCount,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite,
    hasErrored,
    error,
  };
}

export default useSpeakerDataManager;
