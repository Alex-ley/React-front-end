const initState = {
  upload_status: false,
  upload_progress: 0
}

const contentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_CONTENT_PROGRESS':
      // console.log('Add content progress: ' + action.progress + '%');
      return {
        ...state,
        upload_status: action.active,
        upload_progress: action.progress
      };
    case 'ADD_CONTENT_COMPLETE':
      console.log('Add content complete');
      return {
        ...state,
        upload_status: action.active,
        upload_progress: action.progress
      };
    case 'ADD_CONTENT_SUCCESS':
      console.log('add content success');
      return state;
    case 'ADD_CONTENT_ERROR':
      console.log('add content error');
      return state;
    default:
      return state;
  }
};

export default contentReducer;
