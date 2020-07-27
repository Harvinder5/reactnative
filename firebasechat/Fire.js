import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyAAK1dvXdjKJTQQXZ1ifWqsNAu3OK2wsYU',
        authDomain: 'rnchatapp-b6bda.firebaseapp.com',
        databaseURL: 'https://rnchatapp-b6bda.firebaseio.com',
        projectId: 'rnchatapp-b6bda',
        storageBucket: 'rnchatapp-b6bda.appspot.com',
        messagingSenderId: '900870151959',
        appId: '1:900870151959:web:2c4c87fb3f0814f9e92152',
        measurementId: 'G-LPC6P0V220',
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };

      this.db.push(message);
    });
  };

  parse = message => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('message');
  }

  getuid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
