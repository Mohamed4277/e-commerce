function verifCredentials(name, password, users) {
  const isAccess =
    users.findIndex(
      (user) => user.name === name && user.password === password
    ) === -1
      ? false
      : true;
  const isAdmin =
    isAccess === true &&
    users[
      users.findIndex(
        (user) => user.name === name && user.password === password
      )
    ].role === "Admin";
  const id =
    isAccess === true &&
    users[
      users.findIndex(
        (user) => user.name === name && user.password === password
      )
    ].id;
  return { isAccess, isAdmin, id };
}

module.exports = verifCredentials;
