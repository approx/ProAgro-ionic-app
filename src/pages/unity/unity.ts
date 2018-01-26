import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnityProvider } from '../../providers/unity/unity';
import { UnityInterface, UnityModel} from '../../model/unity.model';

/**
 * Generated class for the UnityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unity',
  templateUrl: 'unity.html',
})
export class UnityPage {
  unity:UnityInterface={};
  unities:UnityModel[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private unityProvider:UnityProvider
  ) {
    this.getUnities();
  }

  getUnities(){
    this.unityProvider.getAll().subscribe((data:UnityModel[])=>{
      this.unities = data;
    });
  }

  Register(){
    this.unityProvider.post(this.unity).subscribe((data)=>{
      this.getUnities();
      this.unity = {
        id:'',
        name:''
      }
    });
  }

  Delete(id){
    this.unityProvider.delete(id).subscribe((data)=>{
      this.getUnities();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnityPage');
  }

}
