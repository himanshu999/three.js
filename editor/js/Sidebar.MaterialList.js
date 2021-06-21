import { UIElement, UIButton, UICheckbox, UIColor, UIInput, UINumber, UIPanel, UIRow, UISelect, UIText, UITextArea } from './libs/ui.js'
import { SetMaterialCommand } from './commands/SetMaterialCommand.js';

function SidebarMaterialList(editor){
	

  const placeholderImage = 'data:image/png;base64,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';
  var matCategorised = editor.matCategorised;	
  var signals = editor.signals;
	
  
  var container = new UIPanel();
  container.setId('materiallist');
  container.setBorderTop( '0' );
  container.setPaddingTop( '4px' );
 
	
  /*container.add(new UIText('Leather').addClass('sidebarh2'));
  
  var materialListRow = new UIRow();
  materialListRow.add(createMaterialView());
  
  container.add(materialListRow);*/
  
  
  function createMaterialView(matName, matCategoryName){
 
     
    var template = document.createElement('template');
    template.innerHTML = '<div class="mat-thumb" style="background-image:url('+placeholderImage+')"><span class="mat-name">'+matName+'</span></div>';
    
    template.content.firstChild.addEventListener( 'click', () => handleClickOnMatThumb(matName, matCategoryName), false );
	  
    let materialView = new UIElement(template.content.firstChild);  
	 
    return materialView;
  
  }
	
  function handleClickOnMatThumb(matName, matCategoryName){
  
	  //let matCommand = new SetMaterialCommand( editor, editor.selected, editor.matCategorised['Leather'][0], 1 ), 'New Material: Test' );
  	
	  editor.setMaterialFromJSON(editor.matCategorised['Leather'][0], editor.selected);
  }
	
	
  function createMaterialList(){
	  
	  container.clear();
	  
	  container.add(new UIText('Material Library').setStyle('width', ['100% !important']).addClass('sidebarh1'));
  	
	  for(const matCategoryName in matCategorised){
  	
	  container.add(new UIText(matCategoryName).addClass('sidebarh2'));
	  
	  let materialListRow = new UIRow();
	  
	  matCategorised[matCategoryName].forEach((mat, matIndex) => {
	  	
		materialListRow.add(createMaterialView(mat['name'], matCategoryName));	   
		  
	  });
	  
	  container.add(materialListRow);
	  
  }
  
  }	
	
 signals.materialListChanged.add(createMaterialList); 	
  
 createMaterialList();
  
  
  return container;

}

export { SidebarMaterialList };
