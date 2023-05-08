export const changeFollowersValue = (followers,status) => {
    if (status) {
      let newFollowersValue = (followers -= 1);
      return newFollowersValue;
    } else if (!status) {
      let newFollowersValue = (followers += 1);
      return newFollowersValue;
    }
  };