export const readLocalStrage = () => {
    
}
const Storage_name = 'GorgeOverlay-4';
const localstorage_VersionCheck = () => {
    let data;
    if (localStorage.getItem(Storage_name) === null) {
        data = localstorage_defalt();
        localstorage_disksave(data);
      }
      else {
        let saved = JSON.parse(localStorage.getItem(Storage_name));
        data = saved;
        if (saved.VERSION === Localstorage_dictionary.VERSION.value) {
          //console.log('Version match!');
          //localstorage_restore();
        }
        else {
          console.log('New update');
          let updated_data = localstorage_update(saved);
          //save
          data = updated_data;
          localstorage_disksave(updated_data);
          //localstorage_restore();
        }
      }
}