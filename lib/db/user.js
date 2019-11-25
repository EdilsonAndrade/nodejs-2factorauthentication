const allUsers = [
  { id: 1, name: "Marcelo S.", email: "marcelo@gmail.com", password: "123456", phone: "11977456057" },
  { id: 2, name: "Juliana O.", email: "juliana@gmail.com", password: "123456", phone: "11977456057" },
  { id: 3, name: "Tina S.", email: "tina@gmail.com", password: "123456", phone: "11977456057" },
  { id: 4, name: "João R.", email: "joao@gmail.com", password: "123456", phone: "11977456057" }
];

module.exports = {
  getAll: function() {
      return allUsers;
  },
  getById: function(id) {
      return allUsers.find(user => {
          return user.id == id;
      });
      
  },
  getByLogin: function(email, password){
    return allUsers.find(user=> { return user.email===email, user.password ===password});
  }
};