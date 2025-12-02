export const logout = (req, res) => {
  res.clearCookie("user");

  res.json({ success: true });
};
export const deposit = () => {
  const user = req.cookies.user;
  const ammount = req.body.ammount;
  const response = depositService(user, ammount);
  if(response === ){};
};
export const withdraw = () => {};
