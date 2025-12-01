export const logout = (req, res) => {
  res.clearCookie("user");
  res.json({ success: true });
};
export const deposit = () => {};
export const withdraw = () => {};
