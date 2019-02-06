import { dispatch } from "rxjs/internal/observable/pairs";

export const FETCH_MY_ITEMS = 'FETCH_MY_ITEMS';
export const FETCH_SEARCH_ITEMS = 'FETCH_SEARCH_ITEMS';
export const CREATE_USER = 'CREATE_USER';
export const FETCH_ITEM = 'FETCH_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

const createItem= (props)=> {

     
console.log(props)
    dispatch( {
        type: "CREATE_USER",
        payload: props
    });
}
export default createItem