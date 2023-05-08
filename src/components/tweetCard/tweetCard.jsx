import { useEffect, useState } from 'react';
import { changeFollowers } from '../../api/api';
import { getUser } from '../../api/api';
import { changeFollowersValue } from '../../mix/functions';

export const TweetCard = ({ tweetCard }) => {
  const [userInfo, setUserInfo] = useState(tweetCard);
  const { user, tweets, followers, avatar, id } = userInfo;
  const [followStatus, setfollowStatus] = useState(
    localStorage.getItem(`followStatus:${id}`)
      ? JSON.parse(window.localStorage.getItem(`followStatus:${id}`))
      : { id, status: false }
  );
  const { status } = followStatus;

  useEffect(() => {
    localStorage.setItem(`followStatus:${id}`, JSON.stringify(followStatus));
  }, [followStatus,id]);

  const changeBtn = async () => {
    setfollowStatus(prevState => {
      return (prevState = {
        id,
        status: !status,
      });
    });
  
    let updateFollowers = {
      followers: changeFollowersValue(followers,status),
    };
    await changeFollowers(id, updateFollowers);
    await getUser(id).then(userChangeInfo => {
      setUserInfo(() => {
        return userChangeInfo;
      });
    });
  };
  return (
    <>
      <div>
          <div>
            <img src={avatar} alt={user} />
          </div>
        <p>Tweets:{tweets} </p>
        <p>Followers:{followers} </p>
        {!status ? (
          <button type="button" status={status.toString()} onClick={changeBtn}>
            Follow
          </button>
        ) : (
          <button type="button" status={status.toString()} onClick={changeBtn}>
            Following
          </button>
        )}
      </div>
    </>
  );
};
