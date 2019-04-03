// import firebase from 'firebase'
import uuid from 'uuid';

export const addContent = (content, files) => {
  return (dispatch, getState, {getFirebase,getFirestore}) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    const id = uuid.v4();
    // console.log(id);
    // File or Blob
    var file = files[0] //for now only single upload possible
    const folder = file.type.slice(0,5) + "s/"
    const arr = file.name.split(".");
    const extension = arr[arr.length - 1];
    console.log(files);
    // Create the file metadata
    var metadata = {
      contentType: file.type
    };
    // Create a root reference
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child(folder + id + '.' + extension).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        // console.log(getState());
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            // console.log('Upload is running');
            dispatch({ type: 'ADD_CONTENT_PROGRESS', progress: progress , active: true})
            break;
          default:
            break;
        }
      }, function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log(error.code);
      dispatch({ type: 'ADD_CONTENT_ERROR' }, error);

    }, function() {
      // Upload completed successfully, now we can get the download URL
      dispatch({ type: 'ADD_CONTENT_COMPLETE', progress: 0, active: false });
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);

        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('media').doc(id).set({
          ...content,
          authorFirstName: profile.firstName,
          authorLastName: profile.lastName,
          authorId: authorId,
          createdAt: new Date(),
          firebaseURL : downloadURL
        }).then((docRef) => {
          // console.log(docRef);
          dispatch({ type: 'ADD_CONTENT_SUCCESS' });
        }).catch(err => {
          dispatch({ type: 'ADD_CONTENT_ERROR' }, err);
        });

      });
    });

  }
};
