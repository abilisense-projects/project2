 //action שמכניס לי מערך שלם
export const INSERTINGANARRAY = 'INSERTINGANARRAY';
export const InsertingAnArray = (alerts) => ({
  type:'INSERTINGANARRAY' ,
  payload: alerts,
});



//action שמכניס אלרט אחד ומעדכן את המערך
export const updateArrayAction = (alert) => {
  return {
    type: 'UPDATE_ARRAY',
    payload: alert,
  };
};
