import { useContext } from 'react';
import ImageToggleOnScroll from './ImageToggleOnScroll';
import { FavoriteClickCountContext } from './FavoriteClickCountContext';

const SpeakerDetail = React.memo(({ speaker, onHeartFavoriteHandler }) => {
  const { id, firstName, lastName, favorite, bio } = speaker;
  console.log(`SpeakerDetail:${id} ${firstName} ${lastName} ${favorite}`);
  const { incrementFavoriteClickCount } = useContext(FavoriteClickCountContext);

  return (
    <div className="card col-4 cardmin">
      <ImageToggleOnScroll
        className="card-img-top"
        primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
        secondaryImg={`/static/speakers/Speaker-${id}.jpg`}
        alt="{firstName} {lastName}"
      />
      <div className="card-body">
        <h4 className="card-title">
          <button
            className={favorite ? 'heartredbutton' : 'heartdarkbutton'}
            onClick={(e) => {
              onHeartFavoriteHandler(e, speaker);
              incrementFavoriteClickCount();
            }}
          />
          <span>
            {firstName} {lastName}
          </span>
        </h4>
        <span>{bio}</span>
      </div>
    </div>
  );
});

export default SpeakerDetail;
