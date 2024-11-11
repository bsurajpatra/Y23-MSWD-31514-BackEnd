const setSession = (req, res) => {
    req.session.user = { username: 'user123' }; 
    res.json({ message: 'Session is set' });
  };
  
  const getSession = (req, res) => {
    if (req.session.user) {
      res.json({ message: `Welcome ${req.session.user.username}` });
    } else {
      res.json({ message: 'No session data found' });
    }
  };
  
  const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  };
  
  module.exports = { setSession, getSession, logout };
  