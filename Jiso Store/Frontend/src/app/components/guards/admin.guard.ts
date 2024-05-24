import { CanActivateFn } from '@angular/router';


export const adminGuard: CanActivateFn = (route,state) => {

  let user : any ;
  const currentUser = localStorage.getItem('User');
    if (currentUser) {
      user = JSON.parse(currentUser);
    }
  if (user.role != 'admin') {
    alert('Page inaccessible!');
    return false; 
  }
  return true; 

};
