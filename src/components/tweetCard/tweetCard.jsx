import { useEffect, useState } from 'react';
import { changeFollowers } from '../../api/api';
import { getUser } from '../../api/api';
import { changeFollowersValue } from '../../mix/functions';
import css from './tweetCard.module.css'
export const TweetCard = ({ tweetCard }) => {
  const [userInfo, setUserInfo] = useState(tweetCard);
  const { user, tweets, followers, avatar, id } = userInfo;
  const [followStatus, setfollowStatus] = useState(
    localStorage.getItem(`followStatus:${id}`)
      ? JSON.parse(window.localStorage.getItem(`followStatus:${id}`))
      : { id, status: false }
  );
  
  useEffect(() => {
    localStorage.setItem(`followStatus:${id}`, JSON.stringify(followStatus));
  }, [followStatus,id]);
  
  const changeHander = async () => {
    setfollowStatus(prevState => {
      return (prevState = {
        id,
        status: !status,
      });
    });
    const updateFollowers = {
      followers: changeFollowersValue(followers,status),
    };
    await changeFollowers(id, updateFollowers);
    await getUser(id).then(userChangeInfo => {
      setUserInfo(() => {
        return userChangeInfo;
      });
    });
  };
  const { status } = followStatus;
  return (
    <>
      <li className={css.item}>
        <div className={css.imgBorder}>
          <div className={css.imgThumb}>
            <img className={css.img} src={avatar} alt={user} />
          </div>
        </div>
        <p className={css.text}>Tweets:{tweets.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </p>
        <p className={css.text}>Followers:{followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </p>
        {!status ? (
          <button className={css.btn} type="button" status={status.toString()} onClick={changeHander}>
            Follow
          </button>
        ) : (
          <button className={css.btn__active} type="button" status={status.toString()} onClick={changeHander}>
            Following
          </button>
        )}
      </li>
    </>
  );
};
