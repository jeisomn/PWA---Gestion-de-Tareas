import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tareas } from '../pages/models/tarea';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTareasService {

  private path = '/listado'
  tareasRef: AngularFirestoreCollection<any>

  constructor(private db: AngularFirestore) {
    this.tareasRef = db.collection(this.path);

    this.tareasRef.valueChanges().subscribe(data => {
      console.log(data)
    })
  }

  //Metodo para recuperar todas las tareas de firebase
  getAll(){
    return this.tareasRef.valueChanges();
  }

  //Metodo para guardar las tareas
  save(tareas: Tareas){
    const uid = this.db.createId();
    tareas.uid =  uid;
    return this.tareasRef.doc(uid).set(Object.assign({},tareas))

  }

//Metodo para recuperar las tareas
getTarea(uid: string){
  console.log('uid', uid)
    return this.db.doc(this.path+'/'+uid).valueChanges()
  }

  //Metodo para eliminar las tareas
  eliminartarea(uid: string){
    return this.tareasRef.doc(uid).delete();
  }

  //Metodo para obtener las tareas por el uid
  getTareaPorUid(uid: string): Observable<Tareas | undefined> {
    // Obtener la tarea por UID desde Firebase
    return this.db.collection<Tareas>('tareas').doc<Tareas>(uid).valueChanges();
  }

  //Metodo para actualizar las tareas
  update(tarea: Tareas) {
    // Asegúrate de que la tarea tenga un UID antes de intentar actualizar
    if (tarea.uid) {
      return this.tareasRef.doc(tarea.uid).update(Object.assign({}, tarea));
    } else {
      console.error('La tarea no tiene un UID, no se puede actualizar.');
      return Promise.reject('La tarea no tiene un UID, no se puede actualizar.');
    }
  }

}
