import { nanoid } from 'nanoid';
import { getUsers } from '../../api/api';
import { useState, useEffect} from 'react';
import { TweetCard } from '../tweetCard/tweetCard';
export const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 5) {
      alert(`You already can see all tweeters`); //change to notify
      return;
    }
    getUsers(page).then(user => {
      if (page === 1) {
        setUsers(() => {
          return [...user];
        });
      } else {
        setUsers(prevUser => {
          return [...prevUser, ...user];
        });
      }
    });
  }, [page]);
  const loadMore = () => {
    setPage(prevPage => {
      return prevPage + 1;
    });
  };

  return (
    <>
      <div>
        <ul>
          {users.map(user => (
            <TweetCard key={nanoid()} tweetCard={user} />
          ))}
        </ul>
        {users.length < 50 && (
          <button onClick={loadMore}>Load more</button>
        )}
      </div>
    </>
  );
};