export {default as useContactsService} from './useContactsService';
export {default as useExpensesService} from './useExpensesService';
export {default as useProductsService} from './useProductsService';
export const dateHelper = (date:Date) => {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()<10 ? `0${date.getMinutes()}` : date.getMinutes()}`;

}
