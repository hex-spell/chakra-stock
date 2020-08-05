export {default as useContactsService} from './useContactsService';
export const dateHelper = (date:Date) => {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()<10 ? `0${date.getMinutes()}` : date.getMinutes()}`;

}
