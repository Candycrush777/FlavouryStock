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
  recipesList?: Recipe[]//Array para leer desde BD
  recipe?: Recipe
  modalTitle=""//para MODALS
  modalContent=""
  recipeAEditar: Recipe | null = null//para el edit
  recipeAEliminar: Recipe | null = null//para delete
  mostrarModal = false

  constructor(private recipeService:RecipeService){}

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(){

    this.recipeService.getAllRecipes().subscribe(
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
  
      //Swal de confirmacion
      Swal.fire({
        title: "¿Estás seguro de eliminar la receta?",
        text: "Esta acción no tiene vuelta atrás",
        //showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: `No, mantener`,
        confirmButtonColor: '#000000B3',
        cancelButtonColor: '#888888B3',
        
        didOpen: () => {
  
          const addHoverEffects = (button: HTMLElement, originalColor: string) => {
            // Transición para suavizar el cambio de estilo
            button.style.transition = '0.15s ease-in-out';
      
            button.addEventListener('mouseenter', () => {
              // Aplica color de hover y sombra cuando el cursor entra
              button.style.backgroundColor = 'rgba(237, 117, 87, 0.645)';
              button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            });
            button.addEventListener('mouseleave', () => {
              // Restaura el color original y elimina la sombra cuando el cursor sale
              button.style.backgroundColor = "#000000B3";
              button.style.boxShadow = 'none';
            });
          };
  
          
          // Obtiene el botón de confirmación y aplica border-radius
          const confirmBtn = Swal.getConfirmButton();
          if (confirmBtn) {
            confirmBtn.style.borderRadius = '10px'; // Cambia este valor según lo necesario
            addHoverEffects(confirmBtn, '#3085d6');
          }
          // Obtiene el botón de denegación y aplica border-radius
          const cancelBtn = Swal.getCancelButton();
          if (cancelBtn) {
            cancelBtn.style.borderRadius = '10px';
            addHoverEffects(cancelBtn, '#3085d6');
          }
        }
  
        
      }).then((result) => {
        //dentro del confirmar meto la funcion EJECUTORA
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
  


   openModal(content: string, recipe?:Recipe ) {
      this.mostrarModal = true;
      //reseteo de users
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
      this.modalTitle = "CONFIRMACIÓN"; // Resetear el título del modal
      this.modalContent = ` La receta ${recipe.nombre}, ha sido editada con exito`; 
  
    }

}
