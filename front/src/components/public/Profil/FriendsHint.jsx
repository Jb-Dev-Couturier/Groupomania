import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../Utils';
import FollowHandler from './FollowHandler';

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      // eslint-disable-next-line
      usersData.map((user) => {
        if (
          user._id !== userData._id &&
          !user.followers.includes(userData._id) &&
          !user.isBanished
        )
          return array.push(user._id);
      });
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 3;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else {
        array.length = 0;
      }
      setFriendsHint(array);
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            // eslint-disable-next-line
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (
                  user === usersData[i]._id &&
                  usersData[i].isAdmin === false
                ) {
                  return (
                    <li className="user-hint" key={user}>
                      <img
                        src={
                          usersData[i].profilePicture
                            ? PF + usersData[i].profilePicture
                            : PF + 'defaultProfile.png'
                        }
                        alt="user-pic"
                      />
                      <p>{usersData[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={'suggestion'}
                      />
                    </li>
                  );
                }
              }
            })}
        </ul>
      )}
    </div>
  );
};

export default FriendsHint;
