import { nanoid } from 'nanoid';
import { getUsers } from '../../api/api';
import { useState, useEffect} from 'react';
import { TweetCard } from '../tweetCard/tweetCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './tweetList.module.css'
export const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > 5) {
        toast("Wow you`ve reached the end !", {
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
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
        <ul className={css.list}>
          {users.map(user => (
            <TweetCard key={nanoid()} tweetCard={user} />
          ))}
        </ul>
        {users.length < 15 && (
          <button className={css.btn} onClick={loadMore}>Load more</button>
        )}
      </div>
    </>
  );
};