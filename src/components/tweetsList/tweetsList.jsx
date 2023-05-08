import { nanoid } from 'nanoid';
import { getUsers } from '../../api/api';
import { useState, useEffect} from 'react';
import { TweetCard } from '../tweetCard/tweetCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadTable } from '../LoadCircle/LoadCircle';
import css from './tweetList.module.css'
export const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);  
  useEffect(() => {
    setIsLoading(true)
    if (page === 4) {
        toast("Wow you`ve reached the end !", {
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            setIsLoading(false)
    }
    getUsers(page).then(user => {
        console.log(page)
        if (page === 1) {
            setUsers(() => {
                setIsLoading(false)
                return [...user];
            });
        } else {
            setUsers(prevUser => {
                setIsLoading(false)
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
        {!isLoading && <ul className={css.list}>
          {users.map(user => (
              <TweetCard key={nanoid()} tweetCard={user} />
              ))}
        </ul>}
        {isLoading && <LoadTable/>}
        {users.length < 16 && (
          <button className={css.btn} onClick={loadMore}>Load more</button>
        )}
      </div>
    </>
  );
};