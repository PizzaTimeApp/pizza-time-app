import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/components/alerts/alert/alert.component';
import { LoadingComponent } from 'src/app/components/alerts/loading/loading.component';
import { AdminApiIngredientService } from '../../../../../api/ingredient/admin/admin-api-ingredient.service';
import { ToastComponent } from '../../../../components/alerts/toast/toast.component';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.page.html',
  styleUrls: ['./create-ingredient.page.scss'],
})
export class CreateIngredientPage implements OnInit {

  ingredient: FormGroup

  constructor(
    private adminApiIngredientService : AdminApiIngredientService, 
    private alert: AlertComponent,
    private loading: LoadingComponent,
    private router:Router,
    private fb: FormBuilder,
    private toast: ToastComponent
  ) {}

  ngOnInit() {
    this.ingredient = this.fb.group({
      name: ['', Validators.required],
    })
  }

  get name() {
    return this.ingredient.get('name');
  }

  async createIngredient(){
    const loading = await this.loading.createLoading();
    
    this.adminApiIngredientService.createIngredient(this.ingredient.value).subscribe(
      async (res) => {
        // console.log(res);
        await loading.onDidDismiss();
        this.toast.presentToast('Ingrédient ajouté avec succès !', 3000);
        this.router.navigateByUrl('/app/admin/ingredient', { replaceUrl: true});
      },
      async (err) => {
        // console.log(err);
        await loading.onDidDismiss();
        this.alert.presentAlert('Un problème est survenu', "Si l'erreur persiste contacter le support", ['Réessayer']);
      }
    );
    
  }
}
