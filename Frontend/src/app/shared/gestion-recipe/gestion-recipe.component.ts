import { Component } from '@angular/core';
import { Recipe } from '../../models/recipes';
import { RecipeService } from '../../services/recipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-recipe',
  standalone: false,
  templateUrl: './gestion-recipe.component.html',
  styleUrl: './gestion-recipe.component.css'
})
export class GestionRecipeComponent {
  recipesList?: Recipe[]
  recipe?: Recipe
  modalTitle=""
  modalContent=""
  recipeAEditar: Recipe | null = null
  recipeAEliminar: Recipe | null = null
  mostrarModal = false
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private recipeService:RecipeService){}

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(){

    this.recipeService.getAllRecipesList().subscribe(
      (recipe) =>{
        this.recipesList = recipe
        console.log('Datos recibidos en funcion desde TS', this.recipesList);
        
      }, error=>{
        console.log('Error obtenido en recipes en el TS', error);
        
      }
    )

  }

  deleteRecipe(idRecipe:number){
      
      console.log('Usuario a Eliminar:', idRecipe); 
  
      
      Swal.fire({
        title: "¿Estás seguro de eliminar la receta?",
        text: "Esta acción no tiene vuelta atrás",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: `No, mantener`,
        confirmButtonColor: '#000000B3',
        cancelButtonColor: '#888888B3',
        
        didOpen: () => {
  
          const addHoverEffects = (button: HTMLElement, originalColor: string) => {
            
            button.style.transition = '0.15s ease-in-out';
      
            button.addEventListener('mouseenter', () => {
              
              button.style.backgroundColor = 'rgba(237, 117, 87, 0.645)';
              button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            });
            button.addEventListener('mouseleave', () => {
              
              button.style.backgroundColor = "#000000B3";
              button.style.boxShadow = 'none';
            });
          };
  
          const confirmBtn = Swal.getConfirmButton();
          if (confirmBtn) {
            confirmBtn.style.borderRadius = '10px'; 
            addHoverEffects(confirmBtn, '#3085d6');
          }
          
          const cancelBtn = Swal.getCancelButton();
          if (cancelBtn) {
            cancelBtn.style.borderRadius = '10px';
            addHoverEffects(cancelBtn, '#3085d6');
          }
        }
  
        
      }).then((result) => {
        
        if (result.isConfirmed) {
          if (idRecipe) {
            this.recipeService.deleteRecipe(idRecipe!).subscribe({
              next: (response)=>{
                console.log("RECETA ELIM", response);
                
                Swal.fire("Receta eliminada con exito", "","success")
                this.getRecipes()
              }, error: (error)=>{
                console.log('Error al editar receta', error)
                Swal.fire('Error', 'No se pudo Eliminar la receta', 'error')
              }
            })
          }
        } else if (result.isDenied) {
          Swal.fire("La receta no ha sido eliminada", "", "info");
        }
      });
  
    }

  editRecipe(){
    if (this.recipeAEditar) {
          
          this.recipeService.updateRecipe(this.recipeAEditar.id_receta!/* asercion */, this.recipeAEditar).subscribe({
            next: (response) =>{
              console.log('Comprobar Receta modificado correctamente', response);
              this.getRecipes()     
              this.closeModal(this.recipeAEditar!)
              
            },
            error: (error) => {
              console.log('Error al editar receta', error)
              Swal.fire('Error', 'No se pudo actualizar el receta', 'error')
            }
          })
        }
  }

  openModal(content: string, recipe?:Recipe ) {
      this.mostrarModal = true;
      
      this.recipeAEditar= null
      this.recipeAEliminar= null
  
  
      if (content === 'edit'){
        this.modalTitle="EDITANDO RECETA"
        this.modalContent=""
        this.recipeAEditar = recipe? { ...recipe} : null
        console.log('Receta a editar:', this.recipeAEditar); 
        
        
      }else if (content=== "crear") {
        this.modalTitle= "CREANDO RECETA"
        this.modalContent=""
      }
    
  }
  
  closeModal(recipe:Recipe){

    this.mostrarModal = false;
    this.recipeAEditar = null;
    this.recipeAEliminar = null;
    this.modalTitle = "CONFIRMACIÓN"; 
    this.modalContent = ` La receta ${recipe.nombre}, ha sido editada con exito`; 

  }

}
